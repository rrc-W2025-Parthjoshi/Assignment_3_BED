import { eventSchemas } from "../src/api/v1/validation/eventSchemas";

describe("Event Validation Schema", () => {
    describe("Create Event", () => {
        it("should fail when name is missing", () => {
            // Arrange
            const input = {
                date: "2026-12-25T09:00:00.000Z",
                capacity: 100,
            };

            // Act
            const { error } = eventSchemas.create.body.validate(input);

            // Assert
            expect(error).toBeDefined();
            expect(error?.details[0].message).toBe('"name" is required');
        });

        it("should fail when name is less than 3 characters", () => {
            // Arrange
            const input = {
                name: "AB",
                date: "2026-12-25T09:00:00.000Z",
                capacity: 100,
            };

            // Act
            const { error } = eventSchemas.create.body.validate(input);

            // Assert
            expect(error).toBeDefined();
            expect(error?.details[0].message).toBe(
                '"name" length must be at least 3 characters long'
            );
        });

        it("should fail when capacity is less than 5", () => {
            // Arrange
            const input = {
                name: "Test Event",
                date: "2026-12-25T09:00:00.000Z",
                capacity: 4,
            };

            // Act
            const { error } = eventSchemas.create.body.validate(input);

            // Assert
            expect(error).toBeDefined();
            expect(error?.details[0].message).toBe(
                '"capacity" must be greater than or equal to 5'
            );
        });

        it("should fail when status is invalid", () => {
            // Arrange
            const input = {
                name: "Test Event",
                date: "2026-12-25T09:00:00.000Z",
                capacity: 100,
                status: "pending",
            };

            // Act
            const { error } = eventSchemas.create.body.validate(input);

            // Assert
            expect(error).toBeDefined();
            expect(error?.details[0].message).toBe(
                '"status" must be one of [active, cancelled, completed]'
            );
        });
    });
});