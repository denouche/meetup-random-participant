meetup-random-participant
=========================

## Build the image

```bash
docker build -t myimage .
```

```bash
docker run -i -t -e "MEETUP_GROUP=ChtiJUG" -e "MEETUP_EVENT=227251146" denouche/meetup-random-participant
```


