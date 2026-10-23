# Retratos de pacientes

Esta pasta alimenta a seção **"Sorrisos do Instituto Visage"**.

O conteúdo dela **não entra no repositório**. O `.gitignore` ignora tudo
aqui, menos este arquivo. O repositório é público, e são rostos
identificáveis — uma vez enviados, permanecem no histórico do git mesmo
que sejam apagados depois.

## Como usar

1. Copie as fotos para esta pasta. Formatos aceitos: `.jpg`, `.jpeg`,
   `.png`, `.webp`.
2. Rode `npm run dev`.

É só isso. A seção lê a pasta sozinha e ordena pelo nome do arquivo —
não é preciso mexer em código para acrescentar, trocar ou remover uma
foto. As dimensões de cada imagem são lidas no build (veja
`vite/casos.ts`), então a grade não salta enquanto as fotos carregam.

Com a pasta vazia, a seção não aparece e o site funciona normal.

Para controlar a ordem, nomeie os arquivos em sequência:
`sorriso-01.jpg`, `sorriso-02.jpg`, e assim por diante.

## O que pode entrar aqui

**Somente retratos individuais.** Nada de "antes e depois", nem
comparações lado a lado, nem painéis com close dos dentes ao lado do
rosto. O Código de Ética Odontológica (Res. CFO-118/2012, art. 44) veda
esse formato em publicidade odontológica. Retrato isolado é permitido.

## Antes de publicar o site

Confirme que existe **autorização de uso de imagem assinada por cada
paciente** (LGPD e Código de Ética Odontológica). A responsabilidade
recai sobre o cirurgião-dentista.

Faltando qualquer autorização, remova a foto correspondente ou desligue
a seção inteira em `src/data/casos.ts`:

```ts
export const MOSTRAR_CASOS = false
```

## Peso das imagens

As fotos entram como estão, sem otimização. Para uma apresentação local
isso não é problema. Antes de ir para produção, vale reduzi-las para
cerca de 1200px no lado maior:

```bash
# ImageMagick
mogrify -resize '1200x1200>' -quality 80 -format webp *.jpg
```
