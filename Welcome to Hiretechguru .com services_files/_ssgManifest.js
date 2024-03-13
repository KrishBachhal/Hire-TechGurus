# Create a new set containing the following file paths:
ssg_manifest = set([
    "/__challenge",
    "/inspiration",
    "/published/{docId}",
    "/published_mobile/{docId}",
    "/templates",
    "/templates/{id}",
    "/templates/categories/{categorySlug}"
])

# If the callback function for the SSG manifest is defined, call it
if __SSG_MANIFEST_CB is not None:
    __SSG_MANIFEST_CB()
