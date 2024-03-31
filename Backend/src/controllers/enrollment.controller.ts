import { Request, Response } from "express";

import CourseModel from "../models/course";
import StudentModel from "../models/student";

import EnrollmentModel from "../models/enrollment";
import {
  CreateEnrollmentInput,
  ParamsInput,
} from "../schemas/enrollment.schema"
import { Identifier } from "sequelize/types/model";

export const getEnrollmentsController = async (
  req: Request<{}, {}, {}>,
    res: Response
) => {
  try {
    const enrollments = await EnrollmentModel.findAll();

    console.log("\n" + typeof(enrollments) + "\n")

    enrollments.forEach((enrollment) => {
      //what I wanted to do here was forge a string that makes the routes look better,
      // but I cannot find a way to make it possible
    });

    res.status(200).json({
      status: "success",
      results: enrollments.length,
      enrollments
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export const addStudentToCourseController = async (
    req: Request<{}, {}, CreateEnrollmentInput>,
    res: Response
  ) => {
  
    try {

        var studentId = req.body.studentId;
        var courseId = req.body.courseId;

        console.log("\nstudent id: " + studentId)
        console.log("course id: " + courseId)

        //used to check if a student or course with the given id exists
        const student = await StudentModel.findByPk(studentId);
        const course = await CourseModel.findByPk(courseId);

        console.log("checked")

        const enrollment = await EnrollmentModel.create({
            studentId,
            courseId
        });

        console.log("enrollment logged \n")
        
        res.status(204).json();

    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  
export const deleteStudentFromCourseController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
  
    try {
        const result = await EnrollmentModel.destroy({
          where: { id: req.params.enrollmentId },
          force: true,
        });
    
        if (result === 0) {
          return res.status(404).json({
            status: "fail",
            message: "Course with that ID not found",
          });
        }
    
        res.status(204).json();
      } catch (error: any) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
    }
  }