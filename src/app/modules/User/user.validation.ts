import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password is Required.",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is Required.",
    }),
    email: z.string({
      required_error: "Email is Required.",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is Required.",
    }),
  }),
});

const createDoctor = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  doctor: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required!",
    }),
    address: z.string().optional(),
    registrationNumber: z.string({
      required_error: "Reg number is required",
    }),
    experience: z.number().optional(),
    gender: z.enum(["MALE", "FEMALE"]),
    appointmentFee: z.number({
      required_error: "appointment fee is required",
    }),
    qualification: z.string({
      required_error: "quilification is required",
    }),
    currentWorkingPlace: z.string({
      required_error: "Current working place is required!",
    }),
    designation: z.string({
      required_error: "Designation is required!",
    }),
  }),
});

const createPatient = z.object({
  password: z.string({
    required_error: "Password is Required.",
  }),
  patient: z.object({
    email: z
      .string({
        required_error: "Email is required!",
      })
      .email(),
    name: z.string({
      required_error: "Name is required!",
    }),
    contactNumber: z.string({
      required_error: "Contact number is required!",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

export const UserValidationSchema = {
  createAdmin,
  createDoctor,
  createPatient,
};
