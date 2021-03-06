import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(
            submitFeedbackService.execute({
                type: "BUG",
                comment: "Example comment",
                screenshot: "data:image/png;base64vkjwvbekvbj",
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("should not be able to submit a feedback without type", async () => {
        await expect(
            submitFeedbackService.execute({
                type: "",
                comment: "Example comment",
                screenshot: "data:image/png;base64vkjwvbekvbj",
            })
        ).rejects.toThrow();
    });

    it("should not be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedbackService.execute({
                type: "BUG",
                comment: "",
                screenshot: "data:image/png;base64vkjwvbekvbj",
            })
        ).rejects.toThrow();
    });

    it("should not be able to submit a feedback with an invalid screenshot", async () => {
        await expect(
            submitFeedbackService.execute({
                type: "BUG",
                comment: "Example comment",
                screenshot: "data:;base64vkjwvbekvbj",
            })
        ).rejects.toThrow();
    });
});
