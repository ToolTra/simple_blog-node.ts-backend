import mongoose, { Schema, Types } from "mongoose";

// Interface for a category model's attributes
interface CategoryAttributes {
    label: string,
    posts: Types.ObjectId[]
}

// Schema for a category model
const categoryModelSchema = new Schema<CategoryAttributes>(
    {
        label: {
            type: String,
            required: true,
            unique: true
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual for counting the associated posts to a category
categoryModelSchema.virtual('postsNb', {
    ref: 'Post',
    localField: 'posts',
    foreignField: '_id',
    count: true
});

// Category model
const CategoryModel = mongoose.model('Category', categoryModelSchema);

export default CategoryModel;
export { CategoryAttributes };

