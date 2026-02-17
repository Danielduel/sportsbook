FROM node:25-alpine

WORKDIR /app/sportsbook

RUN yarn add storybook
COPY ./sportsbook/package.json .
COPY ./sportsbook/yarn.lock .
RUN yarn

COPY ./sportsbook/[^(node_modules)]* .
CMD yarn dev

