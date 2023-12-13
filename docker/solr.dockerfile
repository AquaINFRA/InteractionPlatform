FROM alpine/git as clone

WORKDIR /harvester

ARG HARVESTER_BRANCH "main"

ARG GITLAB_TOKEN=glpat-iG1kjrbLkyu2ZRqrQy1q
RUN git clone --branch ${HARVESTER_BRANCH} --single-branch https://oauth2:$GITLAB_TOKEN@git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester.git


FROM solr:9.2.0

COPY --from=clone /harvester/onestop4all-harvester/index/solr/metadata /var/solr/data/metadata

USER root
RUN chown -R solr /var/solr/data
USER solr
