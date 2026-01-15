import mockServices from "./services.js";

export const getMockData = (req, res) => {


  const mockData = mockServices
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

// export const createMockData = async (req, res) => {
//   const { name, description, price } = req.body;

//   const newService = {
//     id: String(services.length + 1),
//     name: name,
//     description: description,
//     price: price,
//   };
//   try {
//     services.push(newService);
//     res.status(201).json(newService);
//   } catch {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error,
//     });
//   }
// };
