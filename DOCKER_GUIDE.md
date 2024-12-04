# Docker and GitHub Collaboration Guide

This guide will help you set up and collaborate on this project using Docker and GitHub.

## Prerequisites

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Install [Git](https://git-scm.com/downloads)
3. Have a GitHub account
4. Have access to the project's Supabase credentials

## Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd markentry
   ```

2. Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Replace `your_supabase_url` and `your_supabase_anon_key` with the actual credentials.

## Working with Docker

### Building the Docker Image

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key" \
  -t markentry .
```

### Running the Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key" \
  markentry
```

Access the application at: http://localhost:3000

### Useful Docker Commands

```bash
# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove a container
docker rm <container_id>

# View container logs
docker logs <container_id>

# Run in detached mode (background)
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key" \
  markentry

# Enter a running container
docker exec -it <container_id> /bin/sh
```

## Git Workflow

1. Always pull the latest changes before starting work:
   ```bash
   git pull origin main
   ```

2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub for review

## Development Workflow

1. When starting work:
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Rebuild Docker image with latest changes
   docker build \
     --build-arg NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
     --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key" \
     -t markentry .
   
   # Run the container
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
     -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key" \
     markentry
   ```

2. After making changes:
   - Stop the current container
   - Rebuild the image
   - Run the new container to test changes
   - Commit and push your changes

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find the process using port 3000
   netstat -ano | findstr :3000
   # Or use a different port
   docker run -p 3001:3000 ...
   ```

2. **Docker build fails**
   - Check your .env.local file exists
   - Ensure Docker Desktop is running
   - Try removing the image and rebuilding:
     ```bash
     docker rmi markentry
     docker build ...
     ```

3. **Can't access the application**
   - Ensure the container is running: `docker ps`
   - Check logs: `docker logs <container_id>`
   - Try accessing both http://localhost:3000 and http://127.0.0.1:3000

### Getting Help

1. Check the Docker logs:
   ```bash
   docker logs <container_id>
   ```

2. Inspect the container:
   ```bash
   docker inspect <container_id>
   ```

3. Access container shell:
   ```bash
   docker exec -it <container_id> /bin/sh
   ```

## Best Practices

1. Always pull latest changes before starting work
2. Don't commit the `.env.local` file
3. Keep Docker image up to date with latest changes
4. Use meaningful commit messages
5. Create Pull Requests for code review
6. Document significant changes

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs) 