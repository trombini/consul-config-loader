# consul-config-loader

The idea is to load several key/value paths from Consul, flatten them to a single object, and replace placeholders (e.g. `${database.host}`) with properties of the same configuration.

