

find out for yourself
```bash
bun install
bun run --bun dev
```
(or if you suck and are a loser)
```bash
npm install
npm run dev
```


### environment variables

the following environment variables must be set. the read and write
keys can be identical. i prefer to separate the permissions into separate
keys because im autistic
```
S3_READ_ACCESS_KEY_ID=...
S3_READ_SECRET_ACCESS_KEY=...
S3_WRITE_ACCESS_KEY_ID=...
S3_WRITE_SECRET_ACCESS_KEY=...
S3_ENDPOINT=...
S3_BUCKET=...
DATABASE_URL=...
```

### object storage

i use backblaze b2 for object storage, if you do the same, you will need
to configure the cross origin resource sharing policy on the bucket you're
using to allow presigned upload and download urls to work from the browser.

to do so, you should create a bucket in b2 and then set up the b2 cli

```bash
brew install b2-tools

# you'll need to authenticate with your master application key
b2 account authorize

# and then run my little helper script
./scripts/fix-cors.bash
```


### database

the database is turso (libsql). you can run it locally by installing the
turso cli and running

```bash
./scripts/start-db.bash
```

and then from another shell

```bash
./scripts/seed-db.bash
```


