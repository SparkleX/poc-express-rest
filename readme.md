# POC Restful Service


# install & start
```bash
npm install
npm run build
npm start
```

## findAll

```bash
curl http://localhost:3000/student/
```

```json
[{"id":100,"firstName":"Wu","lastName":"Wang"},{"id":101,"firstName":"Liu","lastName":"Liu"}]
```

## get

```bash
curl http://localhost:3000/student/100
```

```json
{"id":100,"firstName":"Wu","lastName":"Wang"}
```

## create

```bash
curl -d '{"id":1, "firstName":"AA"}' -H "Content-Type: application/json" -X POST http://localhost:3000/student
```

## update

```bash
curl -d '{"id":1, "firstName":"BB"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/student/1
```

## delete

```bash
curl -X DELETE http://localhost:3000/student/1
```