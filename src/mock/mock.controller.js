import mockServices from "./services.js";
import Data from "./mock.model.js";

export const getMockData = (req, res) => {
  const mockData = mockServices;
  try {
    res.status(200).json({
      success: true,
      message: "Get mock",
      data: mockData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export const createMockData = async (req, res) => {
  try {
    const { name, description, price } = req.body; // กำหนดค่าที่จะไปใช้สร้าง

    const newService = await Data.create({
      name: name,
      description: description, //สร้าง DATA ไปเก็บไว้ในตัวแปร newService เพื่อรับที่จะไปสร้างใน mongoDB
      price: price,
    });

    return res.status(201).json({
      success: true,
      message: "Creted successfully ",
      data: newService, // ถ้าสร้างสำเร็จ จะแสดงเป็น 201 บอกว่าได้แล้ว
    });
  } catch (error) {
    console.log("Error code:", error.code);
    if (error.code === 11000) {
      // 11000 ใช้เพื่อหาค่าที่ซ้ำกัน
      return res.status(409).json({
        success: false,
        message: "Duplicate Entry", // ถ้าซ้ำจะโยน 409 บอกว่ามีค่าที่ซ้ำกันแล้วใน mongoDB
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
