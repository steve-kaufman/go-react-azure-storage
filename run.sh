#!/usr/bin/env bash

export REACT_APP_SAS_CONTAINER=$SAS_CONTAINER
export REACT_APP_SAS_SERVICE=$SAS_SERVICE

yarn build && ./server