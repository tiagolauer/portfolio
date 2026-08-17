import type { Lang } from '@/i18n/strings';

export interface ProjectFeature {
  term: string;
  desc: string;
}

export interface ProjectText {
  tagline: string;
  body: string[];
  features: ProjectFeature[];
}

export interface ProjectLink {
  href: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  language: string;
  stack: string[];
  links: ProjectLink[];
  example: string;
  text: Record<Lang, ProjectText>;
}

export const PROJECTS: Project[] = [
  {
    slug: 'pieces-to-agents',
    name: 'pieces-to-agents',
    language: 'TypeScript',
    stack: ['TypeScript', 'Node.js ≥ 20', 'MCP', 'CLI'],
    links: [
      { href: 'https://github.com/tiagolauer/pieces-to-agents', label: 'GitHub ↗' },
      { href: 'https://www.npmjs.com/package/pieces-to-agents', label: 'npm ↗' },
    ],
    example: `npx pieces-to-agents

npx pieces-to-agents --days 30 --target CLAUDE.md --alias "my product"`,
    text: {
      en: {
        tagline:
          'Turns your Pieces Long-Term Memory into an AGENTS.md your coding agents can read. It runs locally and you approve every write.',
        body: [
          'Agent context files like AGENTS.md and CLAUDE.md have become the standard way to tell Claude Code, Cursor or Copilot how a project works. Almost nobody keeps them current, because writing down what you already know is the first task to get dropped. Meanwhile, PiecesOS has been quietly recording the decisions, the bugs and the dead ends the whole time. This CLI moves one into the other.',
          'A run searches your memory over MCP with two strategies per category. Vector search understands paraphrase but cannot see what was indexed minutes ago; full-text search matches strictly and immediately but misses anything worded differently. Running both covers the gap. Matches are filtered to the current repository, redacted, and composed into markdown between two managed markers, so whatever you wrote by hand survives every run.',
          'Nothing leaves your machine: every call goes to localhost, with no account and no telemetry. And nothing is written without you reading it first. Each run prints a diff and waits for approval, and there is deliberately no flag to skip that step.',
          'Under the hood it reads the summary chain Pieces already writes (about 70 ms) instead of the ask_memory endpoint (about 3.3 s of raw screen OCR), so runs stay fast and the output stays readable markdown.',
        ],
        features: [
          { term: 'Local only', desc: 'Every call goes to localhost:39300. No account, no telemetry, no network.' },
          { term: 'Approval before writing', desc: 'Each run prints a diff and waits for you. There is no flag to skip it.' },
          { term: 'Redaction first', desc: 'Secrets and personal profile data are stripped before you even see the diff.' },
          { term: 'Scoped to one repository', desc: 'A memory has to name the project or an alias before it can be used.' },
          { term: 'Your notes survive', desc: 'Only the text between two managed markers changes; the rest of the file is never touched.' },
        ],
      },
      pt: {
        tagline:
          'Transforma a Long-Term Memory do Pieces em um AGENTS.md que seus agentes de código conseguem ler. Roda local e você aprova cada escrita.',
        body: [
          'Arquivos de contexto como AGENTS.md e CLAUDE.md viraram o padrão para explicar a um Claude Code, Cursor ou Copilot como um projeto funciona. Quase ninguém os mantém atualizados, porque documentar o que você já sabe é a primeira tarefa a ser abandonada. Enquanto isso, o PiecesOS registra em silêncio as decisões, os bugs e os becos sem saída o dia inteiro. Este CLI move um para o outro.',
          'Uma execução busca na sua memória via MCP com duas estratégias por categoria. A busca vetorial entende paráfrase, mas não enxerga o que foi indexado há poucos minutos; a full-text casa de forma estrita e imediata, mas perde o que foi escrito com outras palavras. Rodar as duas cobre a lacuna. Os resultados são filtrados para o repositório atual, passam por redação e viram markdown entre dois marcadores gerenciados, então o que você escreveu à mão sobrevive a toda execução.',
          'Nada sai da sua máquina: toda chamada vai para localhost, sem conta e sem telemetria. E nada é escrito sem você ler antes. Cada execução imprime um diff e espera aprovação, e de propósito não existe flag para pular essa etapa.',
          'Por baixo, ele lê a cadeia de resumos que o Pieces já escreve (uns 70 ms) em vez do endpoint ask_memory (uns 3,3 s de OCR bruto de tela), então as execuções são rápidas e a saída é markdown legível.',
        ],
        features: [
          { term: 'Somente local', desc: 'Toda chamada vai para localhost:39300. Sem conta, sem telemetria, sem rede.' },
          { term: 'Aprovação antes da escrita', desc: 'Cada execução imprime um diff e espera por você. Não existe flag para pular.' },
          { term: 'Redação primeiro', desc: 'Segredos e dados pessoais de perfil são removidos antes mesmo de você ver o diff.' },
          { term: 'Escopo de um repositório', desc: 'Uma memória precisa citar o projeto ou um alias antes de poder ser usada.' },
          { term: 'Suas notas sobrevivem', desc: 'Só o texto entre os dois marcadores gerenciados muda; o resto do arquivo nunca é tocado.' },
        ],
      },
    },
  },
  {
    slug: 'owlsql',
    name: 'OwlSQL',
    language: 'TypeScript',
    stack: ['TypeScript', 'Template Literal Types', 'ESM', 'Node.js ≥ 20'],
    links: [
      { href: 'https://github.com/tiagolauer/OwlSQL', label: 'GitHub ↗' },
      { href: 'https://www.npmjs.com/package/@owlsql/core', label: 'npm ↗' },
      {
        href: 'https://stackblitz.com/github/tiagolauer/OwlSQL/tree/master/examples/playground?file=index.ts',
        label: 'StackBlitz ↗',
      },
    ],
    example: `type DB = {
  users: { id: number; name: string; email: string; active: boolean };
};

const db = createTypedDb<DB>(createPgExecutor(pool));

const a = await db.query('select id from users');
//        a.value: { id: number }[]

const b = await db.query('select name as handle, active from users');
//        b.value: { handle: string; active: boolean }[]

const c = await db.query('select id from users where id = $1', 7);
//                                                          ^ typed as number`,
    text: {
      en: {
        tagline:
          'Write raw SQL and get fully typed results, with no ORM, no codegen and no runtime parsing.',
        body: [
          'OwlSQL exists because of a familiar backend problem: you pick raw SQL over an ORM to keep control of your queries, and every result comes back as unknown[]. The usual fix is writing an interface by hand for each query. That interface restates the column list in a second syntax, and it quietly drifts out of sync the moment someone edits the SQL and forgets the type.',
          "The library's answer is to make the compiler read the query. The entire SQL parser is written as recursive template literal types evaluated by tsc: it normalizes the string, splits the column list, resolves aliases and qualified columns against your schema type, and assembles the exact row shape while you type, in the editor, with no build step.",
          'What ships to production is a passthrough of about 175 lines. It forwards your SQL string, unchanged, to whatever driver you already use (pg, mysql2, better-sqlite3 or node:sqlite) and wraps the rows in a Result. There is no generated file to keep in sync and no SQL parser in the bundle: all the intelligence lives in the .d.ts files.',
          "The trade-off is compile time, and the project measures it instead of hiding it. A fixture of 100 tables and 32 queries (joins, GROUP BY, CTEs, UNION, strict mode) type-checks in about 0.4 s, and CI enforces a ceiling on type instantiations so the parser can't quietly get slower.",
        ],
        features: [
          { term: 'Zero runtime', desc: 'The parser costs 0 bytes; the JavaScript that ships is a thin wrapper around your driver.' },
          { term: 'No build step', desc: 'No codegen, no watcher, no database connection at build time, no generated files in version control.' },
          { term: 'Any driver', desc: 'Your query string reaches the driver exactly as you wrote it.' },
          { term: 'Real SQL subset', desc: 'Aliases, *, joins, aggregates, CTEs, UNION, INSERT/UPDATE/DELETE with RETURNING, typed parameters, and a strict mode that turns typos into type errors.' },
        ],
      },
      pt: {
        tagline:
          'Escreva SQL puro e receba resultados totalmente tipados, sem ORM, sem codegen e sem parsing em runtime.',
        body: [
          'O OwlSQL nasceu de um problema comum de backend: você escolhe SQL puro em vez de um ORM para manter controle sobre as queries, e todo resultado volta como unknown[]. A saída usual é escrever uma interface à mão para cada query. Essa interface repete a lista de colunas numa segunda sintaxe e sai de sincronia em silêncio no momento em que alguém edita o SQL e esquece o tipo.',
          'A resposta da biblioteca é fazer o compilador ler a query. O parser de SQL inteiro é escrito como template literal types recursivos avaliados pelo tsc: ele normaliza a string, separa a lista de colunas, resolve aliases e colunas qualificadas contra o tipo do seu schema e monta o formato exato da linha enquanto você digita, no editor, sem build step.',
          'O que vai para produção é um passthrough de umas 175 linhas. Ele encaminha sua string SQL, sem alteração, para o driver que você já usa (pg, mysql2, better-sqlite3 ou node:sqlite) e embrulha as linhas em um Result. Não existe arquivo gerado para manter em sincronia nem parser de SQL no bundle: toda a inteligência mora nos arquivos .d.ts.',
          'O custo é tempo de compilação, e o projeto mede isso em vez de esconder. Uma fixture com 100 tabelas e 32 queries (joins, GROUP BY, CTEs, UNION, strict mode) passa no type-check em cerca de 0,4 s, e o CI impõe um teto de type instantiations para o parser não ficar mais lento sem ninguém perceber.',
        ],
        features: [
          { term: 'Zero runtime', desc: 'O parser custa 0 bytes; o JavaScript entregue é um wrapper fino sobre o seu driver.' },
          { term: 'Sem build step', desc: 'Sem codegen, sem watcher, sem conexão com banco no build, sem arquivos gerados no versionamento.' },
          { term: 'Qualquer driver', desc: 'A query chega ao driver exatamente como você escreveu.' },
          { term: 'Subconjunto real de SQL', desc: 'Aliases, *, joins, agregações, CTEs, UNION, INSERT/UPDATE/DELETE com RETURNING, parâmetros tipados e um strict mode que transforma typos em erros de tipo.' },
        ],
      },
    },
  },
];

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
