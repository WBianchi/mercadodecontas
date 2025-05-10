"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var axios_1 = __importDefault(require("axios"));
var string_strip_html_1 = require("string-strip-html");
var prisma = new client_1.PrismaClient();
var WP_API_URL = process.env.WORDPRESS_API_URL;
function fetchAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var posts, page, hasMore, response, newPosts, totalPages, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    posts = [];
                    page = 1;
                    hasMore = true;
                    _a.label = 1;
                case 1:
                    if (!hasMore) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("".concat(WP_API_URL, "/wp/v2/posts"), {
                            params: {
                                page: page,
                                per_page: 100,
                                _embed: true
                            }
                        })];
                case 3:
                    response = _a.sent();
                    newPosts = response.data;
                    posts.push.apply(posts, newPosts);
                    totalPages = parseInt(response.headers['x-wp-totalpages']);
                    hasMore = page < totalPages;
                    page++;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    hasMore = false;
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/, posts];
            }
        });
    });
}
function fetchAllCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(WP_API_URL, "/wp/v2/categories"), {
                        params: {
                            per_page: 100
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function fetchAllTags() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(WP_API_URL, "/wp/v2/tags"), {
                        params: {
                            per_page: 100
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function estimateReadTime(content) {
    var wordsPerMinute = 200;
    var words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
function getShortDescription(excerpt) {
    return (0, string_strip_html_1.stripHtml)(excerpt).result.substring(0, 160);
}
function importWordPressPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var defaultAuthor, _a, posts, wpCategories, wpTags, _i, wpCategories_1, cat, _b, wpTags_1, tag, _c, posts_1, post, readTime, postCategories, postTags, existingCategories, existingTags, validCategories, validTags, error_2, error_3;
        var _this = this;
        var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    _v.trys.push([0, 19, 20, 22]);
                    console.log('🚀 Iniciando importação do WordPress...');
                    return [4 /*yield*/, prisma.admin.upsert({
                            where: { email: 'admin@mercadodecontas.com.br' },
                            update: {},
                            create: {
                                username: 'Admin',
                                email: 'admin@mercadodecontas.com.br',
                                password: 'senha_temporaria_123', // Lembre-se de mudar depois
                                role: 'ADMIN',
                                adminCommission: 0
                            }
                        })];
                case 1:
                    defaultAuthor = _v.sent();
                    console.log('✅ Autor padrão criado/atualizado');
                    return [4 /*yield*/, Promise.all([
                            fetchAllPosts(),
                            fetchAllCategories(),
                            fetchAllTags()
                        ])];
                case 2:
                    _a = _v.sent(), posts = _a[0], wpCategories = _a[1], wpTags = _a[2];
                    console.log("\uD83D\uDCDD Encontrados ".concat(posts.length, " posts"));
                    console.log("\uD83D\uDCC1 Encontradas ".concat(wpCategories.length, " categorias"));
                    console.log("\uD83C\uDFF7\uFE0F  Encontradas ".concat(wpTags.length, " tags"));
                    _i = 0, wpCategories_1 = wpCategories;
                    _v.label = 3;
                case 3:
                    if (!(_i < wpCategories_1.length)) return [3 /*break*/, 6];
                    cat = wpCategories_1[_i];
                    return [4 /*yield*/, prisma.blogCategory.upsert({
                            where: { slug: cat.slug },
                            update: {
                                name: cat.name,
                                description: cat.description || null
                            },
                            create: {
                                name: cat.name,
                                slug: cat.slug,
                                description: cat.description || null
                            }
                        })];
                case 4:
                    _v.sent();
                    _v.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('✅ Categorias importadas');
                    _b = 0, wpTags_1 = wpTags;
                    _v.label = 7;
                case 7:
                    if (!(_b < wpTags_1.length)) return [3 /*break*/, 10];
                    tag = wpTags_1[_b];
                    return [4 /*yield*/, prisma.blogTag.upsert({
                            where: { slug: tag.slug },
                            update: { name: tag.name },
                            create: {
                                name: tag.name,
                                slug: tag.slug
                            }
                        })];
                case 8:
                    _v.sent();
                    _v.label = 9;
                case 9:
                    _b++;
                    return [3 /*break*/, 7];
                case 10:
                    console.log('✅ Tags importadas');
                    _c = 0, posts_1 = posts;
                    _v.label = 11;
                case 11:
                    if (!(_c < posts_1.length)) return [3 /*break*/, 18];
                    post = posts_1[_c];
                    _v.label = 12;
                case 12:
                    _v.trys.push([12, 16, , 17]);
                    readTime = ((_e = (_d = post.yoast_head_json) === null || _d === void 0 ? void 0 : _d.twitter_misc) === null || _e === void 0 ? void 0 : _e["Est. reading time"])
                        ? parseInt(post.yoast_head_json.twitter_misc["Est. reading time"])
                        : estimateReadTime(post.content.rendered);
                    postCategories = ((_j = (_h = (_g = (_f = post._embedded) === null || _f === void 0 ? void 0 : _f['wp:term']) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.filter(function (term) { return term.taxonomy === 'category'; })) === null || _j === void 0 ? void 0 : _j.map(function (cat) { return ({ slug: cat.slug }); })) || [];
                    postTags = ((_o = (_m = (_l = (_k = post._embedded) === null || _k === void 0 ? void 0 : _k['wp:term']) === null || _l === void 0 ? void 0 : _l[1]) === null || _m === void 0 ? void 0 : _m.filter(function (term) { return term.taxonomy === 'post_tag'; })) === null || _o === void 0 ? void 0 : _o.map(function (tag) { return ({ slug: tag.slug }); })) || [];
                    return [4 /*yield*/, Promise.all(postCategories.map(function (cat) { return __awaiter(_this, void 0, void 0, function () {
                            var category;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.blogCategory.findUnique({
                                            where: { slug: cat.slug }
                                        })];
                                    case 1:
                                        category = _a.sent();
                                        return [2 /*return*/, category ? { slug: cat.slug } : null];
                                }
                            });
                        }); }))
                        // Verifica se as tags existem
                    ];
                case 13:
                    existingCategories = _v.sent();
                    return [4 /*yield*/, Promise.all(postTags.map(function (tag) { return __awaiter(_this, void 0, void 0, function () {
                            var tagRecord;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.blogTag.findUnique({
                                            where: { slug: tag.slug }
                                        })];
                                    case 1:
                                        tagRecord = _a.sent();
                                        return [2 /*return*/, tagRecord ? { slug: tag.slug } : null];
                                }
                            });
                        }); }))
                        // Filtra apenas categorias e tags que existem
                    ];
                case 14:
                    existingTags = _v.sent();
                    validCategories = existingCategories.filter(Boolean);
                    validTags = existingTags.filter(Boolean);
                    // Cria ou atualiza o post
                    return [4 /*yield*/, prisma.blogPost.upsert({
                            where: { slug: post.slug },
                            update: {
                                title: post.title.rendered,
                                description: post.content.rendered,
                                shortDescription: getShortDescription(post.excerpt.rendered),
                                content: post.content.rendered,
                                thumbnail: ((_r = (_q = (_p = post._embedded) === null || _p === void 0 ? void 0 : _p['wp:featuredmedia']) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.source_url) || '',
                                readTime: readTime,
                                published: true,
                                categories: {
                                    connect: validCategories
                                },
                                tags: {
                                    connect: validTags
                                }
                            },
                            create: {
                                title: post.title.rendered,
                                description: post.content.rendered,
                                shortDescription: getShortDescription(post.excerpt.rendered),
                                content: post.content.rendered,
                                thumbnail: ((_u = (_t = (_s = post._embedded) === null || _s === void 0 ? void 0 : _s['wp:featuredmedia']) === null || _t === void 0 ? void 0 : _t[0]) === null || _u === void 0 ? void 0 : _u.source_url) || '',
                                slug: post.slug,
                                readTime: readTime,
                                published: true,
                                authorId: defaultAuthor.id,
                                categories: {
                                    connect: validCategories
                                },
                                tags: {
                                    connect: validTags
                                }
                            }
                        })];
                case 15:
                    // Cria ou atualiza o post
                    _v.sent();
                    console.log("\u2705 Post importado: ".concat(post.title.rendered));
                    return [3 /*break*/, 17];
                case 16:
                    error_2 = _v.sent();
                    console.error("\u274C Erro ao importar post: ".concat(post.title.rendered), error_2);
                    return [3 /*break*/, 17];
                case 17:
                    _c++;
                    return [3 /*break*/, 11];
                case 18:
                    console.log('✨ Importação concluída com sucesso!');
                    return [3 /*break*/, 22];
                case 19:
                    error_3 = _v.sent();
                    console.error('❌ Erro durante a importação:', error_3);
                    throw error_3;
                case 20: return [4 /*yield*/, prisma.$disconnect()];
                case 21:
                    _v.sent();
                    return [7 /*endfinally*/];
                case 22: return [2 /*return*/];
            }
        });
    });
}
// Executa a importação
importWordPressPosts();
