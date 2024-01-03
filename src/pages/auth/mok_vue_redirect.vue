<template>
  <textarea id="result" rows="20"></textarea>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    let scriptTag = document.createElement('script');
    scriptTag.innerText =
      "let redirectData = new URLSearchParams(location.search).get('data');" +
      "try {" +
      "redirectData = JSON.parse(redirectData);" +
      "document.querySelector('#result').value = JSON.stringify(redirectData, null, 4);" +
      "} catch (error) {" +
      "document.querySelector('#result').value = redirectData;" +
      "}"
    ;

    document.head.appendChild(scriptTag);
  }
};
</script>
