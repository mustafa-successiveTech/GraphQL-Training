export const users = [
  { id: "1", name: "Alice", email: "alice@example.com", postIds: ["101", "102"] },
  { id: "2", name: "Bob", email: "bob@example.com", postIds: ["103"] }
];

export const posts = [
  { id: "101", title: "First Post", content: "Hello World", authorId: "1", commentIds: ["1001"] },
  { id: "102", title: "Second Post", content: "GraphQL is awesome", authorId: "1", commentIds: ["1002", "1003"] },
  { id: "103", title: "Another Post", content: "REST vs GraphQL", authorId: "2", commentIds: [] }
];

export const comments = [
  { id: "1001", text: "Nice post!", authorId: "2" },
  { id: "1002", text: "Very helpful.", authorId: "2" },
  { id: "1003", text: "Thanks for sharing!", authorId: "1" }
];
