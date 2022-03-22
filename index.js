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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import fs from "fs-extra";
import xml from "xml";
(function createRssFeed() {
    return __awaiter(this, void 0, void 0, function () {
        var posts, feedObject, feed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("creating feed");
                    posts = [
                        {
                            title: "Post One",
                            date: "1/1/2020",
                            slug: "post-one",
                            content: "This is some content for post one."
                        },
                        {
                            title: "Post Two",
                            date: "1/2/2020",
                            slug: "post-two",
                            content: "This is some content for post two."
                        },
                        {
                            title: "Post Three",
                            date: "1/3/2020",
                            slug: "post-three",
                            content: "This is some content for post three."
                        },
                        {
                            title: "Post Four",
                            date: "1/4/2020",
                            slug: "post-four",
                            content: "This is some content for post four."
                        },
                    ];
                    feedObject = {
                        rss: [
                            {
                                _attr: {
                                    version: "2.0",
                                    "xmlns:atom": "http://www.w3.org/2005/Atom"
                                }
                            },
                            {
                                channel: __spreadArray([
                                    {
                                        "atom:link": {
                                            _attr: {
                                                href: "http://talkies.online/feed.rss",
                                                rel: "self",
                                                type: "application/rss+xml"
                                            }
                                        }
                                    },
                                    {
                                        title: "talkies.online"
                                    },
                                    {
                                        link: "http://talkies.online/"
                                    },
                                    { description: "Exclusively for movies" },
                                    { language: "en-US" }
                                ], (buildFeed(posts)), true)
                            },
                        ]
                    };
                    feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
                    return [4 /*yield*/, fs.writeFile("./feed.rss", feed, "utf8")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
function buildFeed(posts) {
    var sortedPosts = posts.sort(function (first, second) {
        return new Date(second.date).getTime() - new Date(first.date).getTime();
    });
    var feedItems = [];
    feedItems.push.apply(feedItems, sortedPosts.map(function (post) {
        var feedItem = {
            item: [
                { title: post.title },
                {
                    pubDate: new Date(post.date).toUTCString()
                },
                {
                    guid: [
                        { _attr: { isPermaLink: true } },
                        "https://talkies.online/".concat(post.slug, "/"),
                    ]
                },
                {
                    description: {
                        _cdata: post.content
                    }
                },
            ]
        };
        return feedItem;
    }));
    return feedItems;
}
