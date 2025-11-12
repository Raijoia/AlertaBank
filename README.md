# AlertaBank

AlertaBank é uma plataforma colaborativa para mapear tentativas de golpes e fraudes relacionadas a bancos brasileiros. O projeto combina um **front-end em React** com um conjunto de **microserviços Spring Boot** registrados no Eureka para expor dados centralizados por meio de um API Gateway. Os usuários podem consultar um ranking dos bancos mais citados e registrar novos relatos de fraude para ajudar outras pessoas a permanecerem alertas.

## Arquitetura em alto nível

| Camada | Descrição |
| ------ | --------- |
| Front-end (`frontend/`) | Aplicação React + Vite que consome o gateway em `http://localhost:8080` por padrão. O gráfico principal utiliza `react-chartjs-2` e os dados são carregados por meio das rotas `/bancos` e `/relatos`. |
| API Gateway (`backend/api-gateway/`) | Serviço Spring Cloud Gateway responsável por publicar as rotas REST e encaminhar o tráfego para os microserviços usando o serviço de descoberta do Eureka. |
| Serviço de bancos (`backend/servico-bancos/`) | Microserviço responsável por listar os bancos cadastrados na tabela `tb_bancos`. Usa Spring Data JPA com MySQL. |
| Serviço de relatos (`backend/servico-relatos/`) | Microserviço que registra e lista relatos de golpes. Valida o banco informado consultando o serviço de bancos via discovery antes de persistir os dados. |
| Eureka Server (`backend/eureka-server/`) | Registro de serviços para que os microserviços e o gateway descubram uns aos outros dinamicamente. |

## Pré-requisitos

- Node.js 18+ e npm para executar o front-end.
- JDK 17 e Maven 3.9+ para compilar os microserviços localmente.
- MySQL 8 (ou compatível) com um banco `alertabank_db` acessível pelos serviços `servico-bancos` e `servico-relatos`.
- Docker e Docker Compose opcionais, caso prefira empacotar cada microserviço em contêiner.

## Preparando o banco de dados

1. Inicie uma instância do MySQL (local ou em contêiner) expondo a porta 3306.
2. Crie um banco chamado `alertabank_db` e aplique o script [`db.sql`](./db.sql) para criar as tabelas e inserir bancos iniciais.

```bash
mysql -u <usuario> -p < db.sql
```

3. Configure um usuário com permissão de leitura e escrita nesse banco.

## Configurando variáveis de ambiente

Todos os microserviços Spring Boot esperam que a conexão com o banco seja fornecida por variáveis de ambiente ou por arquivos `application.yml`. Um conjunto mínimo de variáveis é:

```bash
export SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/alertabank_db"
export SPRING_DATASOURCE_USERNAME="<usuario>"
export SPRING_DATASOURCE_PASSWORD="<senha>"
export SPRING_JPA_HIBERNATE_DDL_AUTO="update"
```

Aplique-as antes de iniciar `servico-bancos` e `servico-relatos` (localmente ou dentro dos contêineres).

## Executando o back-end localmente (sem Docker)

Execute os serviços na seguinte ordem, cada um em um terminal separado:

1. **Eureka Server**
   ```bash
   cd backend/eureka-server
   ./mvnw spring-boot:run
   ```
   O painel do Eureka ficará disponível em `http://localhost:8761`.

2. **Serviço de bancos**
   ```bash
   cd backend/servico-bancos
   ./mvnw spring-boot:run
   ```
   Este serviço expõe `/bancos` na porta `8081` e registra-se no Eureka.

3. **Serviço de relatos**
   ```bash
   cd backend/servico-relatos
   ./mvnw spring-boot:run
   ```
   O serviço publica `/relatos` na porta `8082` e consulta o serviço de bancos ao cadastrar um relato.

4. **API Gateway**
   ```bash
   cd backend/api-gateway
   ./mvnw spring-boot:run
   ```
   Depois que o gateway estiver ativo, todas as requisições REST devem ser feitas para `http://localhost:8080`.

## Executando o back-end com Docker Compose

Cada microserviço contém um `Dockerfile` que empacota o artefato `jar`. Para construir e iniciar todos eles de uma vez:

```bash
cd backend
docker compose build
SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/alertabank_db" \
SPRING_DATASOURCE_USERNAME="<usuario>" \
SPRING_DATASOURCE_PASSWORD="<senha>" \
docker compose up
```

> Observação: o arquivo `docker-compose.yml` atual provisiona apenas os serviços Java. Você precisa garantir que o MySQL esteja acessível para os contêineres (por exemplo, executando o MySQL em outro contêiner da mesma rede ou usando `host.docker.internal`).

## Executando o front-end

1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173` no navegador. O front-end utiliza `axios` configurado para o gateway em `http://localhost:8080`; ajuste `frontend/src/services/api.js` caso execute o back-end em outro host ou porta.

Para gerar uma versão de produção:
```bash
npm run build
npm run preview
```

## Fluxo principal da aplicação

1. O usuário acessa a home, que consome `/bancos` e `/relatos` pelo gateway para montar o ranking de relatos.
2. O formulário de denúncia envia um POST para `/relatos`, que valida o banco informado consultando o serviço de bancos via Eureka.
3. Os dados ficam armazenados no MySQL e alimentam o gráfico exibido no front-end.

## Resolução de problemas

- **Erro ao inicializar DataSource**: confirme as variáveis `SPRING_DATASOURCE_*` e se o banco `alertabank_db` existe.
- **Serviços não aparecem no Eureka**: verifique se `eureka-server` está ativo antes de subir os demais serviços e se eles conseguem resolver o host `eureka-server` (em Docker Compose isso ocorre automaticamente).
- **CORS ou erros 404 no front-end**: certifique-se de que o API Gateway (`http://localhost:8080`) esteja ativo; ele já vem configurado com CORS permissivo para qualquer origem.

## Próximos passos sugeridos

- Externalizar a URL do gateway no front-end usando variáveis `VITE_`.
- Automatizar a criação do banco MySQL no `docker-compose.yml` com um serviço adicional.
- Adicionar testes e documentação de API (por exemplo, com SpringDoc OpenAPI).

