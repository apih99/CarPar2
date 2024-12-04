# CLO/PLO Assessment Automation System

A modern web-based application designed to streamline the assessment process of Course Learning Outcomes (CLOs) and Program Learning Outcomes (PLOs) in educational institutions.

## 🚀 Features

- Automated CLO and PLO calculations
- Student marks management
- Normalization of assessment data
- CLO attainment tracking
- PLO mapping and analysis
- Performance dashboard
- Data-driven insights

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Database & Authentication:** Supabase
- **Language:** TypeScript
- **Containerization:** Docker

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)
- Supabase account

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [project-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials and other required variables

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🐳 Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t clo-plo-system .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 clo-plo-system
   ```

## 🔒 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- Additional environment variables as needed

## 📚 Documentation

[Documentation will be added here]

## 🤝 Contributing

[Contribution guidelines will be added here]

## 📄 License

[License information will be added here]

## 👥 Team

[Team information will be added here]

## 📞 Support

[Support information will be added here] 