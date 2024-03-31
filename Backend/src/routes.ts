import express from "express";
import { validate } from "./middleware/validate";
import {
  createNoteController,
  deleteNoteController,
  findAllNotesController,
  findNoteController,
  updateNoteController,
} from "./controllers/note.controller";
import { createNoteSchema, updateNoteSchema } from "./schemas/note.schema";

import {
  createCourseController,
  deleteCourseController,
  findAllCoursesController,
  findCourseController,
  updateCourseController,
} from "./controllers/course.controller";
import { createCourseSchema, updateCourseSchema} from "./schemas/course.schema";

import {
  createStudentController,
  deleteStudentController,
  findAllStudentsController,
  findStudentController,
  updateStudentController,
} from "./controllers/student.controller";
import { createStudentSchema, updateStudentSchema } from "./schemas/student.schema";

import {
  getEnrollmentsController,
  addStudentToCourseController,
  deleteStudentFromCourseController,
} from "./controllers/enrollment.controller"
import { createEnrollmentSchema } from "./schemas/enrollment.schema";

/*
const router = express.Router();

router
  .route("/")
  .get(findAllNotesController)
  .post(validate(createNoteSchema), createNoteController);
router
  .route("/:noteId")
  .get(findNoteController)
  .patch(validate(updateNoteSchema), updateNoteController)
  .delete(deleteNoteController);
*/

const studentRouter = express.Router()

studentRouter
  .route("/")
  .get(findAllStudentsController)
  .post(validate(createStudentSchema), createStudentController)
studentRouter
  .route("/:studentId")
  .get(findStudentController)
  .patch(validate(updateStudentSchema), updateStudentController)
  .delete(deleteStudentController)

const courseRouter = express.Router()

courseRouter
  .route("/")
  .get(findAllCoursesController)
  .post(validate(createCourseSchema), createCourseController)
courseRouter
  .route("/:courseId")
  .get(findCourseController)
  .patch(validate(updateCourseSchema), updateCourseController)
  .delete(deleteCourseController)
courseRouter
  .route("/enrollStudent")
  .put(addStudentToCourseController)
courseRouter
  .route("/deleteStudent")
  .put(deleteStudentFromCourseController)

const enrollmentRouter = express.Router()

enrollmentRouter
  .route("/")
  .get(getEnrollmentsController)
enrollmentRouter
  .route("/enroll")
  .post(validate(createEnrollmentSchema), addStudentToCourseController)
enrollmentRouter
  .route("/deroll/:enrollmentId")
  .delete(deleteStudentFromCourseController)


export default courseRouter;
export {studentRouter, enrollmentRouter};