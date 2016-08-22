# mqtt-bridge

Subscribes to a topic on one broker and republishes its messages to another broker.

```
npm install --global @jdiamond/mqtt-bridge

mqtt-bridge --topic 'foo/bar/#' \
    --from mqtts://source \
    --from-ca path/to/from.crt \
    --from-user alice \
    --from-pass secret \
    --to mqtts://sink \
    --to-ca path/to/to.crt \
    --to-user bob \
    --to-pass secret
```

The required options are `--topic`, `--from`, and `--to`. The rest are optional.

Set `DEBUG=mqtt-bridge` to see debug messages.
