const { User, Course, Enrollment } = require("../models/index");

module.exports = {
    createCourse: async (req, res) => {
        const { title, description } = req.body;
        const created_by  = req.user.id;
        try {
            const newCourse = await Course.create({
                title,
                description,
                created_by
            });
            return res.status(201).json({ message: "course created", course: newCourse });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Course can not be created" });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.findAll();
            if (!courses) {
                return res.status(404).json({message:"No courses in the db"});
            }
            courseCount = await Course.count();
            console.log(courseCount);
            
            return res.status(201).json({message:`found ${courseCount} course(s).`,courses:courses})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:"error finding the courses",error:error});
        }
    },

    getCourseById: async (req, res) => {
        const { id } = req.query;
        console.log(id)
        try {
            // if (!id) {
            //     return res.status(500).json({ message: "id not defined" });
            // }
            const singleCourse = await Course.findByPk(id);
            // if (!singleCourse) {
            //     return res.status(404).json({ message: "course not found" });
            // }
            return res.status(200).json({ course: singleCourse });
        } catch (error) {
            return res.status(500).json({message:"error finding course",error:error})
        }
    },

    updateCourse: async (req, res) => {
        const { id } = req.params;

        const { title, description } = req.body;
        // const created_by = req.user.id;
        try {
            const courseExist = await Course.findByPk(id);
            if (!courseExist) {
                return res.status(404).json({message:"course not found"});
            }
        
            courseExist.title = title || courseExist.title;
            courseExist.description = description || courseExist.description;
            await courseExist.save();
          return res
            .status(201)
            .json({ message: "course updated", course: courseExist });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Course can not be updated" ,error:error.message});
        }
    },

    deleteCourse: async (req, res) => {
        const { id } = req.params;
        try {
            const courseExist = await Course.findByPk(id);
            if (!courseExist) {
                return res.status(404).json({ message: "course does not eist" });
            }
            await courseExist.destroy();
            return res.status(200).json({ message: "course deleted successfully", course: courseExist });
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"could not delete course",error:error.message});
        }
    }
}