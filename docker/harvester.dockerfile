FROM alpine/git as clone

WORKDIR /harvester

ARG HARVESTER_BRANCH "main"

ARG GITLAB_TOKEN=glpat-F9RLgHnzbS8Zgd5YgxW2
RUN git clone --branch ${HARVESTER_BRANCH} --single-branch https://oauth2:$GITLAB_TOKEN@git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester.git


FROM python:3.11.5-bullseye

ENV SOLR_URL "http://localhost:8983/solr/"
ENV SOLR_CORE "metadata"

COPY --from=clone /harvester/onestop4all-harvester /harvester
WORKDIR /harvester

RUN pip install -r requirements.txt

CMD [ "python", "./harvest.py"]