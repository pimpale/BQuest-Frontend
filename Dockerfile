# Need a custom image here so that we can incorporate an npm build too
# Alpine is super light
FROM alpine:3.5

# Download and install packages
RUN apk add -U nginx make nodejs

# Create directories
#   /working is the build directory
#   /static is the directory linked to nginx (serves static content)
RUN mkdir -p /var/www/bquest/working && \
    mkdir -p /var/www/bquest/static && \
    mkdir -p /var/www/bquest/static/build && \
    mkdir -p /var/www/bquest/static/images

# Install the required packages to build the frontend
WORKDIR /var/www/bquest/working
COPY *.json /var/www/bquest/working/
RUN /usr/bin/node --max_semi_space_size=8 \
                  --max_old_space_size=298 \
                  --max_executable_size=248 \
                  /usr/bin/npm install

# Copy the source files
COPY pages/ /var/www/bquest/working/pages/
COPY src/ /var/www/bquest/working/src/
COPY images/ /var/www/bquest/working/images/
COPY .babelrc *.js Makefile /var/www/bquest/working/

# build and copy files to server root
RUN make build && \
    cp -rv pages/* ../static/ && \
    cp -rv lib/build/* ../static/build/

# Copy the configuration file
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
WORKDIR /var/www/bquest/static

# Run the server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
