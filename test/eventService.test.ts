import * as eventService from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createEvent", () => {
        it("should create an event successfully", async () => {
            // Arrange
            const mockEventData = {
                name: "Tech Conference",
                date: "2026-12-25T09:00:00.000Z",
                capacity: 100,
                registrationCount: 0,
                status: "active",
                category: "general",
            };
            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
                size: 0,
                docs: [],
            });
            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                "evt_000001"
            );

            // Act
            const result = await eventService.createEvent(mockEventData);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalled();
            expect(result).toBe("evt_000001");
        });
    });

    describe("getAllEvents", () => {
        it("should return all events successfully", async () => {
            // Arrange
            const mockDocs = [
                {
                    id: "evt_000001",
                    data: () => ({
                        name: "Tech Conference",
                        date: { toDate: () => new Date("2026-12-25") },
                        capacity: 100,
                        registrationCount: 0,
                        status: "active",
                        category: "general",
                        createdAt: { toDate: () => new Date() },
                        updatedAt: { toDate: () => new Date() },
                    }),
                },
            ];
            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
                docs: mockDocs,
            });

            // Act
            const result = await eventService.getAllEvents();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe("evt_000001");
        });
    });

    describe("getEventById", () => {
        it("should return event by id successfully", async () => {
            // Arrange
            const mockDoc = {
                id: "evt_000001",
                data: () => ({
                    name: "Tech Conference",
                    date: { toDate: () => new Date("2026-12-25") },
                    capacity: 100,
                    registrationCount: 0,
                    status: "active",
                    category: "general",
                    createdAt: { toDate: () => new Date() },
                    updatedAt: { toDate: () => new Date() },
                }),
            };
            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                mockDoc
            );

            // Act
            const result = await eventService.getEventById("evt_000001");

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "events",
                "evt_000001"
            );
            expect(result?.id).toBe("evt_000001");
        });
    });

    describe("updateEvent", () => {
        it("should update an event successfully", async () => {
            // Arrange
            const mockUpdateData = { name: "Updated Conference" };
            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await eventService.updateEvent("evt_000001", mockUpdateData);

            // Assert
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "events",
                "evt_000001",
                mockUpdateData
            );
        });
    });

    describe("deleteEvent", () => {
        it("should delete an event successfully", async () => {
            // Arrange
            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await eventService.deleteEvent("evt_000001");

            // Assert
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "events",
                "evt_000001"
            );
        });
    });
});
