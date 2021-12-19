const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const commentDeleteBtns = document.querySelectorAll(".commentDeleteBtn");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("i");
    span2.className = "commentDeleteBtn";
    span2.className = "fas fa-times";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
    span2.addEventListener("click", handleDeleteComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

const handleDeleteComment = async (event) => {
    const {
        target: {
            parentNode,
            dataset: { id },
        },
    } = event;
    console.log(event.target.parentNode);
    parentNode.remove();
    await fetch(`/api/comment/${id}/delete`, {
        method: "DELETE",
    });
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

commentDeleteBtns.forEach((commentDeleteBtn) => {
    commentDeleteBtn.addEventListener("click", handleDeleteComment);
});
