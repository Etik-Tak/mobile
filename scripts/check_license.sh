#!/bin/bash
find etiktak/src -name "*.ts" | xargs grep -L "Copyright (c) 2017, Daniel Andersen (daniel@trollsahead.dk)"
