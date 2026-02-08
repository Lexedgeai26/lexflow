import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLEnumType } from 'graphql';
import { prisma } from '../config/database';

// User Role Enum
const UserRoleType = new GraphQLEnumType({
    name: 'UserRole',
    values: {
        ADMIN: { value: 'ADMIN' },
        USER: { value: 'USER' }
    }
});

// User Type
const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(UserRoleType) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        documents: {
            type: new GraphQLList(DocumentType),
            resolve: async (parent) => {
                return await prisma.document.findMany({
                    where: { userId: parent.id }
                });
            }
        }
    })
});

// Document Type
const DocumentType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Document',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        mimeType: { type: GraphQLString },
        size: { type: GraphQLString },
        version: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        user: {
            type: UserType,
            resolve: async (parent) => {
                return await prisma.user.findUnique({
                    where: { id: parent.userId }
                });
            }
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await prisma.user.findUnique({
                    where: { id: args.id }
                });
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: async () => {
                return await prisma.user.findMany();
            }
        },
        document: {
            type: DocumentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await prisma.document.findUnique({
                    where: { id: args.id }
                });
            }
        },
        documents: {
            type: new GraphQLList(DocumentType),
            args: {
                userId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                if (args.userId) {
                    return await prisma.document.findMany({
                        where: { userId: args.userId }
                    });
                }
                return await prisma.document.findMany();
            }
        }
    }
});

// Root Mutation
const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const updateData: any = {};
                if (args.username) updateData.username = args.username;
                if (args.email) updateData.email = args.email;

                return await prisma.user.update({
                    where: { id: args.id },
                    data: updateData
                });
            }
        }
    }
});

// Export schema
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
