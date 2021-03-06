//@ts-check

const insert = (/** @type {import("mongodb").Collection} */ collection, /** @type {string} */ videoId) => {
    return collection.insertOne({
        videoId,
        watched: new Date()
    });
};

const select = (/** @type {import("mongodb").Collection} */ collection) => {
    return collection.find()
        .toArray();
};

module.exports = {
    insert,
    select
};