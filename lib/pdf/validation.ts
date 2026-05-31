import { z } from "zod";

export const pdfFormatSchema = z.enum([
  "Letter",
  "Legal",
  "Tabloid",
  "Ledger",
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6"
]);

export const marginSchema = z.object({
  top: z.string().min(1).optional(),
  right: z.string().min(1).optional(),
  bottom: z.string().min(1).optional(),
  left: z.string().min(1).optional()
});

export const pdfRequestSchema = z
  .object({
    html: z.string().min(1).max(500_000).optional(),
    css: z.string().max(100_000).optional(),
    url: z.string().url().optional(),
    format: pdfFormatSchema.default("A4"),
    landscape: z.boolean().default(false),
    margin: marginSchema.default({ top: "24px", right: "24px", bottom: "24px", left: "24px" }),
    printBackground: z.boolean().default(true)
  })
  .superRefine((input, ctx) => {
    if (!input.html && !input.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either html or url."
      });
    }

    if (input.html && input.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide html or url, not both."
      });
    }
  });

export type PdfRequestInput = z.input<typeof pdfRequestSchema>;
export type PdfRequest = z.infer<typeof pdfRequestSchema>;

export function validatePdfRequest(input: unknown) {
  return pdfRequestSchema.safeParse(input);
}
