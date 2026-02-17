FROM node:20-alpine

WORKDIR /app/sportsbook
COPY ./sportsbook/package*.json /.
COPY ./sportsbook/yarn.lock .
RUN yarn

COPY ./sportsbook/[^(node_modules)]* .
EXPOSE 3000
CMD yarn storybook

