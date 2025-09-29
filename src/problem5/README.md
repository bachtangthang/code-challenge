# Book Management API

## Architecture

This project follows Clean Architecture principles with clear separation of concerns and dependency inversion:

This project is only sample for applying clean architecture with expressjs so It has many flaw like error handling, middleware, or api response, but these feature can be improved in the future.

Project communicate with each other by interface

We have some crucial interface

- Datagateway -> for communicate with DB (can be Mongodb, postgresql as you want, maybe implement them at the same time)
- ApiGateway -> can be implemented for call http service
- CacheGetway -> can be implemented for cache service
  and many more gateway as you want

With this architecture, you can define different usecase and still use the existed interactor.

In the future, you can even move the http to entrypoints/http, or implement consumer in entrypoints/listener or even grpc call in entrypoints/grpc

### Project Structure

```
src/
├── entities/                    # Domain entities and business rules
│   ├── book.entity.ts          # Core book domain model
├── use-cases/                   # Application business logic
│   ├── interactors/            # Use case implementations
│   │   └── v1/                 # Version 1 of interactors
│   │       ├── create-book/    # Create book use case
│   │       ├── get-book/       # Get book use case
│   │       ├── update-book/    # Update book use case
│   │       ├── delete-book/    # Delete book use case
│   │       └── list-book/      # List books use case
├── controller/                  # Interface adapters (HTTP layer)
│   └── book.controller.ts      # HTTP request/response handling
├── configuration/              # Dependency injection and setup
│   ├── infrastructure.config.ts # Infrastructure singletons
│   └── usecase/               # Use case configurations
│       ├── book.config.ts     # Book interactor configurations
│       └── index.ts           # Configuration exports
├── infrastructure/             # External concerns and frameworks
│   ├── data-gateway/          # Data access layer
│   │   ├── data-gateway.ts    # Abstract data gateway
│   │   └── providers/         # Database providers
│   │       └── mongo/         # MongoDB implementation
│   │           ├── mongodb.ts      # MongoDB connection
│   │           ├── schemas/        # Database schemas
│   │           └── methods/        # Database operations
│   ├── api-gateway/           # External API integrations
│   ├── cache-gateway/         # Caching layer
│   └── tracer/               # Observability and logging
├── interface/                  # Shared interfaces and contracts
├── entrypoints/               # Application entry points
├── app.ts                     # Express application setup
└── index.ts                   # Main application entry point
```

### Architecture Layers

#### 1. Domain Layer (Entities)

- **Pure business logic** with no external dependencies
- Contains business rules, validations, and domain models
- Independent of frameworks, databases, or external services

#### 2. Application Layer (Use Cases)

#### 3. Interface Adapters Layer (Controllers/Routes)

- **HTTP interface** that adapts external requests to internal use cases
- Converts HTTP requests/responses to domain-friendly formats
- Handles validation, serialization, and error formatting

#### 4. Configuration Layer

- **Dependency injection** and application setup
- Manages singleton instances and service configurations
- Wires up dependencies between layers

## Features

- **CRUD Operations**: Create, Read, Update, Delete books
- **Advanced Filtering**: Filter by genre, status, author, publisher, price range
- **Full-Text Search**: Search across multiple fields
- **Pagination**: Efficient data pagination
- **Statistics**: Book statistics and analytics
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling and meaningful error messages
- **Clean Architecture**: Separation of concerns with dependency injection
- **TypeScript**: Full type safety and IntelliSense support
- **Security**: CORS, Helmet, compression, and other security middleware

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd src/problem4
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Build the project**

   ```bash
   npm run build
   ```

5. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Base URL

```
http://localhost:3000/api/v1
```

### Health Check

```http
GET /health
```

### Books

#### Create Book

```http
POST /api/v1/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "lorem pos",
  "genre": "fiction",
  "status": "available",
  "price": 12.99,
  "publication_date": "1925-04-10T00:00:00.000Z",
  "description": "A book",
  "publisher": "Nha Nam",
  "page_count": 180
}
```

#### Get All Books (with filtering and pagination)

```http
GET /api/v1/books?page=1&limit=10&genre=fiction&status=available&search=gatsby
```

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `genre` (string): Filter by book genre
- `status` (string): Filter by book status
- `author` (string): Filter by author name (partial match)
- `publisher` (string): Filter by publisher (partial match)
- `search` (string): Full-text search across title, author, description

#### Get Book by ID

```http
GET /api/v1/books/:id
```

#### Update Book

```http
PUT /api/v1/books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 15.99,
  "status": "out_of_stock"
}
```

#### Delete Book

```http
DELETE /api/v1/books/:id
```

### Book Entity

```typescript
{
  id: string;
  title: string;
  author: string;
  genre: BookGenreEnum;
  status: BookStatusEnum;
  price: number;
  publication_date: Date;
  description?: string;
  publisher?: string;
  page_count?: number;
  create_time: Date;
  update_time: Date;
}
```

### Book Genres

- fiction
- non_fiction
- mystery
- romance
- science_fiction
- fantasy
- thriller
- biography
- history
- self_help
- business
- technology
- health
- cooking
- travel
- children
- young_adult
- poetry
- drama
- other

### Book Statuses

- available
- out_of_stock
- discontinued

## Configuration

### Environment Variables

```env
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/bookmanagement
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### MongoDB Connection

The application connects to MongoDB using the connection string provided in the `MONGODB_URL` environment variable.

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "pagination": { // Only for list endpoints
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "details": "Additional error details" // Optional
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or missing required fields
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

### Example curl commands:

```bash
# Health check
curl http://localhost:3000/health

# Create a book
curl -X POST http://localhost:3000/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "fiction",
    "price": 19.99,
    "publication_date": "2023-01-01"
  }'

# Get all books
curl http://localhost:3000/api/v1/books

# Get book by ID
curl http://localhost:3000/api/v1/books/BOOK_ID_HERE
```

## Deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
