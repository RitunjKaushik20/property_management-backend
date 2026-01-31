const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
exports.register = async (req, res) => {
  console.log("Request body:", req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'buyer',
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, role: true }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("GetProfile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;


    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== userId) {
      return res.status(400).json({ message: "Email already used" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, email },
      select: { id: true, username: true, email: true, role: true }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("UpdateProfile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User not found" });


    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong current password" });


    const hashedPassword = await bcrypt.hash(newPassword, 10);


    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json({ message: "Password updated" });
  } catch (error) {
    console.error("ChangePassword error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
