# Docker Build
## Access Token for Harvester Repository
The docker build needs a access token for the OS4A Harvester repository. If the current access token expires a new access token must be created.
If the access token has expired a error like the following will appear when trying to run `docker-compose build --no-cache`:  
`fatal: Authentication failed for: https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester.git`
### Create new Access Token
 - go to [OneStop4All Harvester Repository](https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-harvester)
 - go to _Settings_ -> _Access Tokens_
 - enter _Token Name_, select _Expiration Date_
 - choose role _Developer_!
 - select (only!) scope *read_repository*
 - copy new Access Token (only visible once)
 - go to [OneStop4All Implementation Repository](https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-implementation)
 - go to [docker/harvest.dockerfile](https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-implementation/-/blob/develop/docker/harvester.dockerfile)
 - replace Access Toke in *ARG GITLAB_TOKEN*
  - go to [docker/harvest.dockerfile](https://git.rwth-aachen.de/nfdi4earth/onestop4all/onestop4all-implementation/-/blob/develop/docker/solr.dockerfile)
 - replace Access Toke in *ARG GITLAB_TOKEN*
 - commit changes
