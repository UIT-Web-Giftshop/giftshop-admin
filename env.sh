#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# env file
file=".env"
if [[ -v APP_ENV ]]; then
  file=".env.${APP_ENV}"
fi

echo "Proccessing env file: $file"

# Add assignment
config_file="env-config.js"
echo "window._ENV_ = {" >> ./$config_file

declare -A hm

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  if [[ $line != REACT_APP_* ]]; then
    continue
  fi

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  hm[$varname]=$value
done < $file

# read env from OS environment
while IFS='=' read -r -d '' n v; do
  if [[ $n != REACT_APP_* ]]; then
    continue
  fi

  hm[$n]=$v
done < <(env -0)

# write to config.js
for el in "${!hm[@]}"
do
  echo "$el=>${hm[$el]}"
  echo "  $el: \"${hm[$el]}\"," >> ./$config_file
done

echo "}" >> ./$config_file

dos2unix ./$config_file