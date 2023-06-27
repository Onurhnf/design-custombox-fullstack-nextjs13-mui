# Custom Box Designer - Fullstack NextJs 13 App

Custom Box Designer is primarily designed for desktop applications. Its main focus is on resizing a box and dividing it into smaller pieces, allowing you to resize the individual cells. You can upload images of any type to each cell, and they will automatically fill the width and height of the cell. Furthermore, when the cell is resized, the image will also resize accordingly.

This application also provides a convenient Google sign-in feature, allowing users to securely access their accounts. Once signed in, users have the ability to store their works and revisit them at any time from History panel.

## Demo Usage

I have published the app on [Vercel](https://vercel.com/). However, please note that currently, Vercel does not support disk storage at the moment. This means that while you can save box sizes in the demo, you will not be able to save images. However, you can still upload images and resize them within the app. Just keep in mind that these changes won't be saved for future access from your design history.

You can try out the app by visiting the following URL: [DEMO](https://design-custombox-fullstack-nextjs13-mui.vercel.app)

To fully experience the app with image saving capabilities, please follow the instructions below to set up the environment locally on your machine. This will allow you to test and explore all the features to your heart's content.

## Installation

1. Clone the repository: `git clone https://github.com/Onurhnf/design-custombox-fullstack-nextjs13-mui`
2. Install the dependencies: `npm install`
3. Configure your own database connection in the `.env` file.
4. Start the app on development: `npm run dev` or `yarn dev`

## Environment

```bash
GOOGLE_ID= "your-google-id"
GOOGLE_CLIENT_SECRET= "your-google-client-secret"

DATABASE= "your-mongodb-conenction"
DATABASE_PASSWORD= "your-mongodb-password"

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET= "your-nextauth-secret"
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request by.

1. Fork the project
2. Create a new branch
3. Make changes
4. Create a Pull Request: Once you have made the changes, commit and push them to your forked repository. Then, navigate to the original repository and click on the "New Pull Request" button. Provide a clear description of the changes you made and submit the pull request.

## Contact

To connect with me or discuss any questions or issues related to the project, you can reach out to me via email at **onurhnf@gmail.com**
