import { z } from "zod";
// product
const MAX_FILE_SIZE_MB = Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) || 5;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];

const fileValidator = (file: File | unknown) => {
  return (
    file instanceof File &&
    ALLOWED_MIME_TYPES.includes(file.type) &&
    file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
  );
};
const fileValidationError = `File must be a JPEG or PNG and less than ${MAX_FILE_SIZE_MB}MB.`;

export const Product = z.object({
  name: z.string().nonempty("Product name is required."),
  description: z.string().nonempty("Description is required."),
  category_id: z.preprocess(
    (value) => parseInt(value as string),
    z.number().positive("Category is required."),
  ),
  product_details: z
    .array(
      z.object({
        size: z.string().nonempty("Size is required."),
        color: z.string().nonempty("Color is required."),
        price: z.preprocess(
          (value) => parseFloat(value as string),
          z
            .number()
            .positive("Price must be a positive value.")
            .int("Price must be an integer."),
        ),
        discount: z.preprocess(
          (value) => parseInt(value as string),
          z
            .number()
            .int("Discount must be an integer.")
            .max(99, "Discount must be less than or equal to 100.")
            .min(0, "Discount must be greater than or equal to 0."),
        ),
        stock: z.preprocess(
          (value) => parseInt(value as string),
          z
            .number()
            .int("Stock must be an integer.")
            .positive("Stock must be positive."),
        ),
        img_preview: z.custom<File>(fileValidator, fileValidationError),
      }),
    )
    .nonempty("At least one product detail is required."),
  images: z
    .array(z.custom<File>(fileValidator, fileValidationError))
    .max(5, "You can upload a maximum of 5 images.")
    .nonempty("At least one image is required.")
    .refine((files) => {
      const fileNames = files.map((file) => file.name);
      return new Set(fileNames).size === fileNames.length;
    }, "Duplicate file names are not allowed."),
});

export type ProductFormData = z.infer<typeof Product>;

// category
export const Category = z.object({
  name: z.string().nonempty("Category name is required."),
  parentId: z.number().optional(),
});

export type CategoryFormData = z.infer<typeof Category>;

// Group
export const Group = z.object({
  name: z.string().nonempty("Group name is required."),
});

export type GroupFormData = z.infer<typeof Group>;

// UserAdminSide`
const Role = z.enum(["admin", "staff", "customer", "supplier"] as const, {
  required_error: "Role is required",
  invalid_type_error: "Role must be one of: ADMIN, STAFF, CUSTOMER, SUPPLIER",
});

export const UserAdminSide = z.object({
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Invalid email address."),
  role: Role,
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password must be at most 20 characters long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    ),
});
