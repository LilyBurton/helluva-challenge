--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Homebrew)
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: lil
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO lil;

--
-- Name: characters; Type: TABLE; Schema: public; Owner: lil
--

CREATE TABLE public.characters (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    show_id integer NOT NULL
);


ALTER TABLE public.characters OWNER TO lil;

--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: lil
--

CREATE SEQUENCE public.characters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characters_id_seq OWNER TO lil;

--
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lil
--

ALTER SEQUENCE public.characters_id_seq OWNED BY public.characters.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: lil
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.genres OWNER TO lil;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: lil
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_id_seq OWNER TO lil;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lil
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: shows; Type: TABLE; Schema: public; Owner: lil
--

CREATE TABLE public.shows (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.shows OWNER TO lil;

--
-- Name: shows_id_seq; Type: SEQUENCE; Schema: public; Owner: lil
--

CREATE SEQUENCE public.shows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shows_id_seq OWNER TO lil;

--
-- Name: shows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lil
--

ALTER SEQUENCE public.shows_id_seq OWNED BY public.shows.id;


--
-- Name: tropes; Type: TABLE; Schema: public; Owner: lil
--

CREATE TABLE public.tropes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    genre_id integer,
    description character varying(255)
);


ALTER TABLE public.tropes OWNER TO lil;

--
-- Name: tropes_id_seq; Type: SEQUENCE; Schema: public; Owner: lil
--

CREATE SEQUENCE public.tropes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tropes_id_seq OWNER TO lil;

--
-- Name: tropes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lil
--

ALTER SEQUENCE public.tropes_id_seq OWNED BY public.tropes.id;


--
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.characters ALTER COLUMN id SET DEFAULT nextval('public.characters_id_seq'::regclass);


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: shows id; Type: DEFAULT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.shows ALTER COLUMN id SET DEFAULT nextval('public.shows_id_seq'::regclass);


--
-- Name: tropes id; Type: DEFAULT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.tropes ALTER COLUMN id SET DEFAULT nextval('public.tropes_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: lil
--

COPY public.alembic_version (version_num) FROM stdin;
27565708c704
\.


--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: lil
--

COPY public.characters (id, name, show_id) FROM stdin;
1	Charlie	1
2	Vaggie	1
3	Angel Dust	1
4	Niffty	1
5	Alastor	1
6	Husk	1
7	Sir Pentious	1
8	Vox	1
9	Valentino	1
10	Velvette	1
11	Blitzo	2
12	Millie	2
13	Moxxie	2
14	Loona	2
15	Stolas	2
16	Stella	2
17	Lucifer	1
18	Lilith	1
19	Adam	1
20	Lute	1
21	Sera	1
22	Emily	1
23	Molly	1
24	Baxter	1
25	Abel	1
26	Camilla	1
27	Katie Killjoy	1
28	Tom Trench	1
29	Travis	1
30	Cherri Bomb	1
31	Frank	1
32	Egg Bois	1
33	Arakniss	1
34	Crymini	1
35	Melissa	1
36	Rocky	1
37	Rosie	1
38	Mimzy	1
39	Kitty	1
40	Agent 1	2
41	Agent 2	2
42	Andrealphus	2
43	Asmodeus	2
44	Barbie Wire	2
45	Beelzebub	2
46	Belphegor	2
47	Chazwick	2
48	Cletus	2
49	Collin	2
50	Crimson	2
51	Emberlynn	2
52	Glitz	2
53	Glam	2
54	Fizzarolli	2
55	Keenie	2
56	Leviathan	2
58	Lyle Lipton	2
59	Mammon	2
60	Martha	2
61	Octavia	2
62	Mrs Mayberry	2
63	Paimon	2
64	Rolando	2
65	Sallie May	2
66	Satan	2
67	Striker	2
68	Vassago	2
69	Verosika Mayday	2
70	Vortex	2
71	Wally Wackford	2
57	Loppty Goopty	2
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: lil
--

COPY public.genres (id, name) FROM stdin;
1	Romance
2	Angst
3	Hurt/Comfort
4	Humor/Crack
5	Action/Adventure
6	Fantasy/Supernatural/Sci-fi
7	Psychological/Dark
8	Slice Of Life/Domestic
9	Alternate Universe (AU)
10	Smut/Erotica
11	Time/Memory
\.


--
-- Data for Name: shows; Type: TABLE DATA; Schema: public; Owner: lil
--

COPY public.shows (id, name) FROM stdin;
1	Hazbin Hotel
2	Helluva Boss
\.


--
-- Data for Name: tropes; Type: TABLE DATA; Schema: public; Owner: lil
--

COPY public.tropes (id, name, genre_id, description) FROM stdin;
1	Enemies to Lovers	1	Constant bickering, intense stares and unresolved tension
2	Friends to Lovers	1	Long-time buddies slowly realizing feelings
3	Slow Burn	1	Painfully gradual emotional development (will they/won't they)
4	Fake Dating	1	They pretend...then gain real feelings
5	Love Triangle	1	Jealousy, conflicted feelings and dramatic declarations
6	Unrequited Love	1	One-sided longing, pining, quiet heartbreak
7	Soulmates	1	Physical or emotional bonding, magical connection, 'you complete me'
8	Mutual Pining	1	Both love each other but too dumb to admit it
9	Forbidden Love	1	Demon/Angel, Peasant/Royalty, Rival families, boss/employee, heightens risk and reward
10	Sexual Tension	1	Tension so thick you can cut it with a knife
11	Breakup and Heartache	2	Emotional devastation, reflection, maybe reconciliation
12	Character death	2	Tragic, meaningful, sometimes sudden
13	"I'm Not Good Enough For You"	2	Insecurity-based self-sabotage
14	Emotional Supression	2	One Character bottling everything up
15	Betrayal	2	Trust broken between friends/lovers
16	Guilt and Regret	2	Especially tied to something in the past
17	Injured in Battle	3	One character gets hurt, the other tends to them
18	Nightmares/Flashbacks	3	Past trauma causes breakdowns, the other comforts them
19	Sickfic	3	One character fallen ill and getting cared for
20	Emotional Collapse	3	A strong character having a mental breakdown
21	Protective Instincts	3	"No one hurts them and gets away with it"
22	Rescue and Recovery	3	Found Injured, brought back to life (emotionally or literally)
23	Dangerous Mission	5	Life or death stakes, big battles
24	Enemies Team up	5	Enemies teaming up with reluctance for mutual goal
25	Betrayal Twist	5	Surprise Villain and Double Agent
26	Training Montage	5	Leveling up, discovering their own power
27	Rescue Mission	5	A character's been kidnapped and needs to be saved
28	Sacrifice Play	5	A character risks it all for other people
29	Found Magic Object	6	Artifact grants power or trouble
30	Prophecy Child	6	A character that's the chosen one with a mysterious fate
31	Reincarnation	6	Remembering a past life or multiple lifetimes
32	Alternate Dimensions	6	Portals, timelines, different realms
33	Body swaps/possession	6	Hijinks, awkwardness and eerie implications
34	Mind Games	7	Manipulation, control, gaslighting
35	Unreliable Narrator	7	You can't trust the POV character
36	Descent into Madness	7	Character slowly going into madness and losing grip with reality
37	PTSD and Trauma	7	Raw, emotional process
38	Villianous Breakdown	7	Big Bad Villian breakdown
39	Monsters Within	7	Horror rooted in emotional or moral decay
40	Wrong Place, Wrong Time	4	The character accidentally walks into something inappropriate, illegal or just bizarre
41	Everyone is drunk/high	4	Everyone is intoxicated where chaos ensues
42	Unlikely Team-ups	4	Characters who shouldn't work together, do
43	Magic Gone Wrong	4	A magic potion or spell causes bizarre behaviour
44	Theatrical Shenanigans	4	Characters end up in a play, musical or a show that goes horribly wrong
45	Ridiculously Mundane Tasks	4	Characters doing mundane tasks wrong
46	Sleep-deprived Shenanigans	4	Character so exhausted that chaos ensues—whether they speak nonsense, hallucinate, or get into the wrong bed
47	4th Wall Breaking	4	A character realizing they're in a show or fanfic
48	Running Gags	4	A joke gets funnier as it's repeated
49	Memes and Pop Culture	4	Memes are inserted into the story
50	Domestic Bliss	8	Characters doing simple things together, laundry, grocery shopping, cooking, cleaning, etc
51	Soft SickFic	8	One character is ill while the other takes care of them
52	Sleepy Cuddles/Accidental Naps	8	Two characters fall asleep next to each other
53	Late Night Talks	8	Vulnerable quiet talks in the middle of the night
54	Routine Moments	8	Showing how a character lives day-to-day
55	Found Family Vibe	8	Characters forming deep familial bonds with people they weren't born into
56	Small Acts of Kindness	8	One character doing something thoughtful
57	Pet Adoption/Pet Problems	8	A character adopts a pet and deals with the pet.
59	Coffee Shop	9	Characters work in the coffee shop
60	High School/College	9	Characters are either a student or a teacher in a teen drama
61	Human	9	Characters are real humans
62	Dungeons and Dragons	9	Characters are part of the party
63	Royalty	9	Characters are kings, queens, knights, peasents
64	Detective/Noir	9	Set in a gritty 1940s style where one of a character is a private eye.
65	Roommates	9	Characters are roommates
66	Videogame	9	Characters are inside a videogame
67	TV Show/Reality Show	9	Characters are in a reality show or are aware they're being watched.
68	Villain Swap	9	Heroes are villians and vice verse
69	Pirate	9	Characters are pirates, navy or stowaways on the high seas
70	Pokemon	9	Characters are either trainers, gym leaders or even pokemon themselves
71	Band/Music	9	Characters are in a band or are musicians
72	Circus/Carnival	9	Characters are part of a circus or a carnival
73	Mafia	9	Crime families, underground deals, power struggles
74	Fairy Tale	9	Characters reimagined as fairy tale characters
75	Office	9	Everyone works in a boring corporate job
76	Zombie Apocalypse	9	End of the world
77	First Time	10	Characters sleep together for the first time
78	Friends with Benefits	10	Two characters have a no connection sexual relationship...until there's a connection
79	PWP	10	No backstory, no fluff, just smut
80	Teasing/Denial	10	Prolonged build-up, interrupted moments, characters getting so close but not quite
81	Accidental Arousal	10	A character gets turned on in an awkward or public setting. The other notices
82	Power Play/DomSub	10	Sexual Interaction layered with dominence, submission and control
83	Heat/Rut/In-Heat	10	Based on animalistic instincts - one character goes into an uncontrollable biological state of need
84	Aftercare	10	Tender moments after sex
85	Seduction Game/Slow Burn Smut	10	Weeks of flirting, almosts, tension, until it explodes
86	Sex Pollen/Magic-Induced Lust	10	External Force makes characters very horny
87	Kink Exploration	10	Characters exploring fantasies, power dynamics or unusual preferances
88	Corruption/Innocence Lost	10	One character is more experienced and guides the other in sexual awakening
89	Possessive/Jealous Sex	10	One character sees a threat to their claim and asserts dominance
90	Time Loop	11	A character relives the event or day over and over again
91	Time Travel	11	A character is sent forward or backward in time
92	Amnesia	11	A character loses all or part of their memory
93	Flashbacks/Past Lives	11	A character is haunted or helped by memories of a past self or past life
94	Reincarnation/Second Life	11	Characters are reborn into new lives and slowly remember who they were
95	Forgotten by Everyone	11	One character is wiped from everyone's memory
96	Cursed Immortality	11	A character lives forever and remembers everything, while others forget, die, or change
97	Alternate Timeline/What-if Scenarios	11	A glimpse at what life could have been under different choices
98	Dreamworld/Memory Realm	11	Characters enter someone's memories or dreams
99	Mind Wipe/Memory Reset	11	A character's memory is erased
58	Therapy or Emotional Healing	8	Characters dealing with trauma in a healthy way
\.


--
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lil
--

SELECT pg_catalog.setval('public.characters_id_seq', 71, true);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lil
--

SELECT pg_catalog.setval('public.genres_id_seq', 11, true);


--
-- Name: shows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lil
--

SELECT pg_catalog.setval('public.shows_id_seq', 2, true);


--
-- Name: tropes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lil
--

SELECT pg_catalog.setval('public.tropes_id_seq', 99, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: shows shows_pkey; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.shows
    ADD CONSTRAINT shows_pkey PRIMARY KEY (id);


--
-- Name: tropes tropes_name_key; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.tropes
    ADD CONSTRAINT tropes_name_key UNIQUE (name);


--
-- Name: tropes tropes_pkey; Type: CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.tropes
    ADD CONSTRAINT tropes_pkey PRIMARY KEY (id);


--
-- Name: ix_characters_id; Type: INDEX; Schema: public; Owner: lil
--

CREATE INDEX ix_characters_id ON public.characters USING btree (id);


--
-- Name: ix_shows_id; Type: INDEX; Schema: public; Owner: lil
--

CREATE INDEX ix_shows_id ON public.shows USING btree (id);


--
-- Name: characters characters_show_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_show_id_fkey FOREIGN KEY (show_id) REFERENCES public.shows(id);


--
-- Name: tropes tropes_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lil
--

ALTER TABLE ONLY public.tropes
    ADD CONSTRAINT tropes_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

