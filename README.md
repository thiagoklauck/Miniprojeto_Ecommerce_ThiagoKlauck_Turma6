## Miniprojeto de E-commerce
Aluno: Thiago Klauck
Turma: Desenvolvedor Back-End Node — T6

### Objetivo

Desenvolver uma aplicação de e-commerce no terminal, utilizando TypeScript e Node.js para gerenciar clientes, produtos, carrinho de compras e pedidos.


### Funcionalidades
- Clientes: cadastrar, listar e buscar por ID.
- Produtos: cadastrar, listar, buscar por ID ou parte do nome, filtrar por categoria, atualizar e remover.
- Carrinho: adicionar e remover produtos, alterar quantidades e calcular subtotais e total.
- Pedidos: finalizar compras, listar pedidos e consultar pedidos por cliente.


### Tecnologias

TypeScript, Node.js, npm e prompt-sync.


### Estrutura dos arquivos
```bash
Miniprojeto_Ecommerce_ThiagoKlauck_Turma6/
├── src/
│   ├── types.ts
│   ├── produtos.ts
│   ├── clientes.ts
│   ├── carrinho.ts
│   ├── pedidos.ts
│   └── main.ts
├── dist/
├── README.md
├── package.json
├── tsconfig.json
└── .gitignore
```


### Como executar

1. Com Node.js e npm instalados, execute na pasta do projeto, nesta ordem:
- npm install — instala as dependências.
- npx tsc — compila os arquivos TypeScript.
- node dist/main.js — inicia o programa.
2. O menu principal permite acessar Clientes, Produtos, Carrinho e Pedidos.
3. Nos submenus, 0 retorna ao menu principal.
4. No menu principal, 0 encerra o programa.
5. Após alterar os arquivos TypeScript, compile novamente com npx tsc.


  
### Regras de negócio

- Clientes e produtos devem possuir IDs maiores que zero e únicos em suas respectivas listas.
- Nome e e-mail do cliente são obrigatórios. E-mails repetidos são recusados.
- Produtos precisam de nome preenchido, preço maior que zero e estoque não negativo.
- O carrinho aceita somente produtos cadastrados e quantidades inteiras, maiores que zero e dentro do estoque disponível.
- Adicionar novamente o mesmo produto soma as quantidades sem duplicar a linha. Alterar a quantidade substitui o valor anterior.
- O subtotal é o preço multiplicado pela quantidade. O total é a soma dos subtotais.
- Pedidos exigem cliente cadastrado, carrinho com itens e estoque suficiente para todos os produtos.
- Se algum item falhar na finalização, nenhum pedido é registrado e nenhum estoque é descontado.
- Após uma compra bem-sucedida, o estoque é reduzido e o carrinho é esvaziado.
- Cada pedido recebe um ID automático e guarda os preços da compra, preservando seu histórico.
- A compra é bloqueada se algum produto do carrinho tiver sido removido do catálogo.



### Demonstração

O programa inicia com três clientes e três produtos cadastrados.

Para demonstrar uma compra em uma nova execução:
1. Em Produtos → Listar, consulte os produtos e seus estoques.
2. Em Carrinho → Adicionar produto, informe o ID 2 e a quantidade 2.
3. Consulte os itens, subtotais e total do carrinho.
4. Em Pedidos → Finalizar compra, informe o cliente de ID 1.
5. Consulte os pedidos registrados e liste novamente os produtos.
O produto de ID 2 é o Mouse, com preço de R$ 50,00 e estoque inicial de 10 unidades. O pedido deve totalizar R$ 100,00, deixando 8 unidades em estoque.
Também é possível buscar por tecla para localizar o Teclado e filtrar por Informática para consultar os produtos dessa categoria.


### Casos de erro

- Preço negativo: ao cadastrar um produto com preço negativo, o programa deve exibir um aviso e solicitar outro preço.
- Quantidade acima do estoque: ao tentar adicionar 11 unidades do Mouse, cujo estoque inicial é 10, o programa deve recusar a inclusão e manter o carrinho sem alterações.
- Carrinho vazio: ao tentar finalizar uma compra sem itens, o programa deve exibir um aviso, sem registrar pedido nem alterar o estoque.


### Limitações

- Os dados ficam apenas na memória e são perdidos ao encerrar o programa.
- O sistema trabalha com um carrinho por vez, e o cliente da compra é informado na finalização.
- Não há autenticação ou pagamento real.


### Referências

- Materiais e exemplos das aulas de Fundamentos para Back-end.
- Mini-Projeto Avaliativo de Back-End Node.
