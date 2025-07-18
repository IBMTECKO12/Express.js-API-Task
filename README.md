# Express CRUD API

## Setup
1. Clone the repository.
2. Install dependencies: `npm install express`.
3. Start the server: `npm start` (or `npm run dev` for nodemon).

## API Endpoints
| Endpoint       | Method | Description                          | Request Body (JSON)               |
|----------------|--------|--------------------------------------|-----------------------------------|
| `/`            | GET    | Hello World test                     | -                                 |
| `/items`       | GET    | Get all items                        | -                                 |
| `/items/:id`   | GET    | Get item by ID                       | -                                 |
| `/items`       | POST   | Create new item                      | `{ "name": "x", "description": "y" }` |
| `/items/:id`   | PUT    | Update item by ID                    | `{ "name": "x", "description": "y" }` |
| `/items/:id`   | DELETE | Delete item by ID                    | -                                 |

## Validation Rules
- **POST/PUT**: Requires `name` and `description` (400 if missing).  
- **ID**: Must be numeric (400 if invalid).  

## Error Responses
- `400`: Invalid request data.  
- `404`: Item/route not found.  
- `500`: Server error.  

## Testing
Import the included `Postman_Collection.json` (attached) to test all endpoints.  