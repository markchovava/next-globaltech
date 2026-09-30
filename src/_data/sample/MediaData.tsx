import { MediaInterface } from "../entity/MediaEntity";
import { AppInfoData } from "./AppinfoData";



export const MediaData: MediaInterface[] = [
    {
        id: 1,
        userId: "system",
        name: "Annual Sports Day",
        description: "Track and field events featuring inter-house competitions, relay races, and trophy presentations.",
        images: [
            { id: 101, mediaId: 1, userId: "system", image: AppInfoData.media[0], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 102, mediaId: 1, userId: "system", image: AppInfoData.media[1], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 103, mediaId: 1, userId: "system", image: AppInfoData.media[2], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 104, mediaId: 1, userId: "system", image: AppInfoData.media[3], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        userId: "system",
        name: "Speech & Prize Giving Day",
        description: "Celebrating academic excellence, leadership awards, and cultural achievements for the graduating class.",
        images: [
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[3], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[0], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[1], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[2], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 3,
        userId: "system",
        name: "Science & Innovation Fair",
        description: "Student-led physics experiments, robotics demos, chemistry showcases, and technology prototypes.",
        images: [
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[1], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 4,
        userId: "system",
        name: "Cultural & Arts Festival",
        description: "Traditional dance performances, poetry recitals, visual art exhibitions, and fashion displays.",
        images: [
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[1], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 5,
        userId: "system",
        name: "Inter-School Debate Championship",
        description: "Critical thinking, policy discourse, and persuasive speaking sessions featuring regional high schools.",
        images: [
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[7], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 6,
        userId: "system",
        name: "Music & Choir Concert",
        description: "Acoustic performances, orchestra showcases, brass band sets, and choral ensemble arrangements.",
        images: [
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[7], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 7,
        userId: "system",
        name: "Leavers' Dinner & Graduation",
        description: "Formal gala evening celebrating final-year students, speeches, and farewell celebrations.",
        images: [
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[7], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 8,
        userId: "system",
        name: "Community Service & Eco Day",
        description: "Tree planting campaigns, school garden cultivation, and local environmental clean-up drives.",
        images: [
            { id: 201, mediaId: 2, userId: "system", image: AppInfoData.media[5], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 204, mediaId: 2, userId: "system", image: AppInfoData.media[7], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 202, mediaId: 2, userId: "system", image: AppInfoData.media[4], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            { id: 203, mediaId: 2, userId: "system", image: AppInfoData.media[6], imageFile: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]