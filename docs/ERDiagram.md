## ER Diagram (inferred)

Below is an Entity-Relationship diagram inferred from the current front-end code (pages and components). It models the main domain objects used by the Case Tracking System (CTS).

```mermaid
erDiagram

    ORGANIZATIONS {
        string id
        string name
        string type
        string code
        string address
        string status
    }

    DEPARTMENTS {
        string id
        string name
        string organization_id
    }

    ROLES {
        string id
        string name
        string description
    }

    USERS {
        string id
        string username
        string password
        string fullName
        string email
        string phone
        string organization_id
        string department_id
        string role_id
        string status
    }

    AGENT_MAPPINGS {
        string id
        string user_id
        string agent_license_no
    }

    CATEGORIES {
        string id
        string name
    }

    PROPOSALS {
        string id
        string proposal_no
        string customer_name
        string license_no
        string vehicle_no
        number sum_insured
        string recipient_role_id
        string workflow_status
        string created_by_user_id
        datetime created_at
    }

    TRACKING_TRANSACTIONS {
        string id
        string proposal_id
        string action
        string assigned_to_user_id
        string assigned_agent_mapping_id
        string status
        datetime created_at
        datetime due_date
        string comment
    }

    NOTIFICATIONS {
        string id
        string proposal_id
        string sender_user_id
        string recipient_user_id
        string recipient_role_id
        string category_id
        string description
        datetime sent_at
        boolean read
    }

    ATTACHMENTS {
        string id
        string proposal_id
        string filename
        string url
        string uploaded_by_user_id
        datetime uploaded_at
    }

    ORGANIZATIONS ||--o{ DEPARTMENTS : has
    ORGANIZATIONS ||--o{ USERS : employs
    DEPARTMENTS ||--o{ USERS : contains
    ROLES ||--o{ USERS : assigned
    USERS ||--o{ AGENT_MAPPINGS : maps_to
    USERS ||--o{ PROPOSALS : creates
    PROPOSALS ||--o{ TRACKING_TRANSACTIONS : has
    PROPOSALS ||--o{ NOTIFICATIONS : generates
    USERS ||--o{ NOTIFICATIONS : sends_or_receives
    CATEGORIES ||--o{ NOTIFICATIONS : categorizes
    PROPOSALS ||--o{ ATTACHMENTS : includes
    AGENT_MAPPINGS ||--o{ TRACKING_TRANSACTIONS : may_be_assigned_to
```

## Notes and assumptions
- This diagram is inferred from the front-end code. There is no explicit backend schema provided in the repository, so fields are guessed from form fields and UI state.
- `USERS` are present in `src/pages/UserSetup.tsx` and used throughout the UI. Currently `UserSetup` keeps users in-memory; I suggest persisting them server-side or to localStorage to match Agent mapping usage.
- `AGENT_MAPPINGS` corresponds to the feature added at `/setup/agent-mapping` (maps a system `user` to an `agent_license_no`). The mapping lets the system route notifications/tasks to an agent identifier.
- `PROPOSALS` represent proposals created in `NewProposal.tsx`. They have a workflow and generate `TRACKING_TRANSACTIONS` and `NOTIFICATIONS` shown in `ReceiveNoti.tsx` and `Tracking`.
- `CATEGORIES` are referenced by notifications via `getCategories()` from `src/lib/categories.ts`.
- `TRACKING_TRANSACTIONS` is an inferred table representing actions (acknowledge, done, closed) and to-do tasks shown in the Tracking/To-Do UI.

## How to use this ER diagram
- You can copy the Mermaid block above into any Markdown viewer that supports Mermaid (e.g., GitHub, VS Code with Mermaid preview) to visualize the diagram.
- If you want, I can:
  - Convert this to a PNG/SVG and add it to the repo (`docs/er-diagram.png`).
  - Produce a SQL DDL (Postgres/MySQL) draft based on this model.
  - Adjust the model to reflect your backend API or additional fields you need.

If you want me to generate SQL DDL or a PNG of the diagram, tell me which database (Postgres/MySQL/SQLite) or format you prefer and I'll add it to the repo.
