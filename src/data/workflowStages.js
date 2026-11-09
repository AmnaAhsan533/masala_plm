
export const workflowStages = [
  {
    id: 1,
    title: "Approval Stage",
    subtitle: "Project Brief",
    description:
      "Initial project proposal, objectives, business requirements and management approval.",

    departments: ["Marketing", "R&D", "Management"],

    deliverables: [
      "Project Brief",
      "Business Justification",
      "Initial Product Requirements",
    ],

    approvalRequired: true,
    approvalName: "Project Brief Approval",
  },

  {
    id: 2,
    title: "Benchmark Analysis",
    subtitle: "Market Research",

    description:
      "Analyze competitor products, market requirements, pricing and product positioning.",

    departments: ["Marketing", "R&D"],

    deliverables: [
      "Competitor Analysis",
      "Market Research Report",
      "Product Benchmark Report",
    ],

    approvalRequired: false,
  },

  {
    id: 3,
    title: "PDRF",
    subtitle: "Regulatory Limits Review",

    description:
      "Review applicable regulatory requirements, ingredient restrictions and quality limits.",

    departments: ["Regulatory", "Quality", "R&D"],

    deliverables: [
      "PDRF Document",
      "Regulatory Requirements",
      "Permitted Ingredient Limits",
    ],

    approvalRequired: false,
  },

  {
    id: 4,
    title: "Prototype",
    subtitle: "Initial Development",

    description:
      "Prepare the initial product prototype and evaluate its preliminary characteristics.",

    departments: ["R&D", "Quality"],

    deliverables: [
      "Initial Prototype",
      "Prototype Evaluation Report",
      "Initial Recipe",
    ],

    approvalRequired: false,
  },

  {
    id: 5,
    title: "Sensory",
    subtitle: "Sensory Evaluation",

    description:
      "Evaluate taste, aroma, color, texture and overall product acceptability.",

    departments: ["R&D", "Quality", "Marketing"],

    deliverables: [
      "Sensory Evaluation Form",
      "Taste Evaluation Results",
      "Sensory Feedback Report",
    ],

    approvalRequired: false,
  },

  {
    id: 6,
    title: "Recipe Formulation",
    subtitle: "BOM Development",

    description:
      "Develop the final recipe using raw materials, formulation percentages and target processing yield.",

    departments: ["R&D", "Procurement", "Quality"],

    deliverables: [
      "Bill of Materials (BOM)",
      "Raw Material Selection",
      "Formulation Cost Sheet",
      "Yield Loss Calculation",
    ],

    approvalRequired: true,
    approvalName: "Recipe Formulation Approval",
  },

  {
    id: 7,
    title: "Pilot Scale Trial",
    subtitle: "Production Trial",

    description:
      "Conduct pilot-scale manufacturing trials to validate the recipe and production process.",

    departments: ["Production", "R&D", "Quality"],

    deliverables: [
      "Pilot Trial Report",
      "Production Parameters",
      "Trial Batch Evaluation",
    ],

    approvalRequired: true,
    approvalName: "Pilot Scale Approval",
  },

  {
    id: 8,
    title: "Shelf Life Study",
    subtitle: "Product Stability",

    description:
      "Evaluate product stability, moisture, sensory characteristics and shelf-life performance.",

    departments: ["Quality", "R&D"],

    deliverables: [
      "Shelf Life Study Plan",
      "Stability Test Results",
      "Shelf Life Assessment Report",
    ],

    approvalRequired: false,
  },

  {
    id: 9,
    title: "Specification",
    subtitle: "RM, In-process & FG Specs",

    description:
      "Prepare technical specifications for raw materials, in-process products and finished goods.",

    departments: ["Quality", "R&D", "Regulatory"],

    deliverables: [
      "Raw Material Specifications",
      "In-process Specifications",
      "Finished Goods Specifications",
    ],

    approvalRequired: false,
  },

  {
    id: 10,
    title: "Labelling Information",
    subtitle: "Ingredient List, NF & Allergens",

    description:
      "Prepare ingredient declarations, nutritional information and allergen warnings for packaging.",

    departments: ["Regulatory", "Quality", "Packaging", "Marketing"],

    deliverables: [
      "Ingredient Declaration",
      "Nutritional Information",
      "Allergen Declaration",
      "Packaging Artwork Information",
    ],

    approvalRequired: false,
  },

  {
    id: 11,
    title: "Commercial Production",
    subtitle: "Final Product Launch",

    description:
      "Release the approved product for regular commercial manufacturing.",

    departments: ["Production", "Quality", "Procurement"],

    deliverables: [
      "Production Release",
      "Final Manufacturing Instructions",
      "Commercial Batch Record",
    ],

    approvalRequired: false,
  },
];
