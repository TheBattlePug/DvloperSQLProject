import { Controller, Route, Get } from '@tsoa/runtime';
import { Request, Response } from "express";
import CourseModel from "../models/course";
import {
  CreateCourseInput,
  FilterQueryInput,
  ParamsInput,
  UpdateCourseInput,
} from "../schemas/course.schema";
import StudentModel from "../models/student";
import { UUID } from "crypto";

//keycloak rubbish
import KeycloakService from '../services/keycloak.service';

export const createCourseController = async (
    req: Request<{}, {}, CreateCourseInput>,
    res: Response
  ) => {
    try {
      const { name, capacity } = req.body;
  
      console.log("check one")

      const course = await CourseModel.create({
        name,
        capacity
      });
      
      console.log("course created")

      res.status(201).json({
        status: "success",
        data: {
          course,
        },
      });
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          status: "failed",
          message: "Course with that title already exists",
        });
      }
  
      res.status(500).json({
        status: "error - 500",
        message: error.message,
      });
    }
  };

export const updateCourseController = async (
    req: Request<UpdateCourseInput["params"], {}, UpdateCourseInput["body"]>,
    res: Response
  ) => {
    try {

      const result = await CourseModel.update(
        { ...req.body, updatedAt: Date.now() },
        {
          where: {
            id: req.params.courseId,
          },
        }
      );
  
      if (result[0] === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Course with that ID not found",
        });
      }
  
      const course = await CourseModel.findByPk(req.params.courseId);
  
      res.status(200).json({
        status: "success",
        data: {
          course,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const findCourseController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      const course = await CourseModel.findByPk(req.params.courseId);
  
      if (!course) {
        return res.status(404).json({
          status: "fail",
          message: "Course with that ID not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          course,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const findAllCoursesController = async (
    req: Request<{}, {}, {}, FilterQueryInput>,
    res: Response
  ) => {
    try {
      //keycloak junk
      const keycloak = new KeycloakService();
      //keycloak.checkAccess();

      const courses = await CourseModel.findAll();

      res.send(courses)
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
export const deleteCourseController = async (
    req: Request<ParamsInput>,
    res: Response
  ) => {
    try {
      
      const result = await CourseModel.destroy({
        where: { id: req.params.courseId },
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
  };

