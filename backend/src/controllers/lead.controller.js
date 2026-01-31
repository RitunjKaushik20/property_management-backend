const prisma = require("../services/prisma");

exports.createLead = async (req, res) => {
  try {
    const { propertyId, agentId, message } = req.body;

    const lead = await prisma.lead.create({
      data: {
        propertyId,
        agentId,
        buyerId: req.user.id,
        message
      }
    });

    res.json(lead);
  } catch (error) {
    console.error("CreateLead error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAgentLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { agentId: req.user.id },
      include: { property: true, buyer: true }
    });

    res.json(leads);
  } catch (error) {
    console.error("GetAgentLeads error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBuyerLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { buyerId: req.user.id },
      include: { property: true, agent: true }
    });

    res.json(leads);
  } catch (error) {
    console.error("GetBuyerLeads error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: { property: true, agent: true, buyer: true }
    });
    res.json(leads);
  } catch (error) {
    console.error("GetAllLeads error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
      include: { property: true, agent: true, buyer: true }
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("GetLeadById error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id }
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const updated = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json(updated);
  } catch (error) {
    console.error("UpdateLead error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id }
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DeleteLead error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
