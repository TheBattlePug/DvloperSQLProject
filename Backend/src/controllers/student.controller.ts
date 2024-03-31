import { Request, Response } from "express";
import StudentModel from "../models/student";
import {
  CreateStudentInput,
  FilterQueryInput,
  ParamsInput,
  UpdateStudentInput,
} from "../schemas/student.schema";

export const createStudentController = async (
    req: Request<{}, {}, CreateStudentInput>,
    res: Response
  ) => {
    try {
      const { name, date_of_birth, gender } = req.body;
  
      const student = await StudentModel.create({
        name,
        date_of_birth,
        gender
      });
  
      res.status(201).json({
        status: "success",
        data: {
          student,
        },
      });
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          status: "failed",
          message: "Student with that title already exists",
        });
      }
  
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

export const updateStudentController = async (
    req: Request<UpdateStudentInput["params"], {}, UpdateStudentInput["body"]>,
    res: Response
  ) => {
    try {
      const result = await StudentModel.update(
        { ...req.body, updatedAt: Date.now() },
        {
          where: {
            id: req.params.studentId,
          },
        }
      );
  
      if (result[0] === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Student with that ID not found",
        });
      }
  
      const student = await StudentModel.findByPk(req.params.studentId);
  
      res.status(200).json({
        status: "success",
        data: {
          student,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const findStudentController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const student = await StudentModel.findByPk(req.params.studentId);
  
      if (!student) {
        return res.status(404).json({
          status: "fail",
          message: "Student with that ID not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          student,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const findAllStudentsController = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response
  ) => {
    try {
      const students = await StudentModel.findAll();
  
      res.send(students)
      
      // res.status(200).json({
      //   status: "success",
      //   results: students.length,
      //   students,
      // });


    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const deleteStudentController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const result = await StudentModel.destroy({
        where: { id: req.params.studentId },
        force: true,
      });
  
      if (result === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Student with that ID not found",
        });
      }
  
      res.status(204).json();
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  