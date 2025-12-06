# Docker Setup Guide

This guide explains how to build and run the Ryde Rent-A-Car application using Docker.

## Prerequisites

- Docker installed on your system ([Download Docker](https://www.docker.com/get-started))
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual configuration values.

### 2. Build and Run with Docker Compose

The easiest way to run the application:

```bash
docker-compose up -d
```

This will:
- Build the Docker image
- Start the container
- Expose the application on port 3000

Access the application at: `http://localhost:3000`

### 3. Stop the Application

```bash
docker-compose down
```

## Manual Docker Commands

If you prefer to use Docker directly without Docker Compose:

### Build the Image

```bash
docker build -t ryde-rent-a-car .
```

### Run the Container

```bash
docker run -p 3000:3000 --name ryde-app ryde-rent-a-car
```

With environment variables:

```bash
docker run -p 3000:3000 --env-file .env.local --name ryde-app ryde-rent-a-car
```

### Stop and Remove the Container

```bash
docker stop ryde-app
docker rm ryde-app
```

## Docker Architecture

The Dockerfile uses a **multi-stage build** approach for optimal image size and security:

1. **Dependencies Stage**: Installs npm packages
2. **Builder Stage**: Builds the Next.js application
3. **Runner Stage**: Creates a minimal production image with only necessary files

### Key Features:

- ✅ **Optimized Image Size**: Multi-stage build reduces final image size
- ✅ **Security**: Runs as non-root user (nextjs:nodejs)
- ✅ **Production Ready**: Uses Next.js standalone output
- ✅ **Fast Builds**: Leverages Docker layer caching
- ✅ **Alpine Linux**: Minimal base image for smaller footprint

## Viewing Logs

```bash
# Docker Compose
docker-compose logs -f

# Docker
docker logs -f ryde-app
```

## Rebuilding After Changes

```bash
# Docker Compose
docker-compose up -d --build

# Docker
docker build -t ryde-rent-a-car .
docker stop ryde-app
docker rm ryde-app
docker run -p 3000:3000 --name ryde-app ryde-rent-a-car
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Environment Variables Not Loading

Make sure your `.env.local` file exists and is properly formatted. For Docker Compose, you can also add variables directly in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=your_value
```

### Build Failures

Clear Docker cache and rebuild:

```bash
docker-compose build --no-cache
```

## Production Deployment

For production deployments:

1. Set `NODE_ENV=production` in your environment variables
2. Configure proper database connections
3. Set up SSL/TLS certificates
4. Use a reverse proxy (nginx, Traefik) for HTTPS
5. Implement proper logging and monitoring

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
