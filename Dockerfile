# 1️⃣ Imagem base
FROM node:20

# 2️⃣ Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3️⃣ Copia package.json e package-lock.json
COPY package*.json ./

# 4️⃣ Instala dependências
RUN npm install

# 5️⃣ Copia todo o código da aplicação
COPY . .

# 7️⃣ Expõe a porta que sua API usa
EXPOSE 8026

# 8️⃣ Comando para iniciar o app
CMD ["npm", "run", "start"]
