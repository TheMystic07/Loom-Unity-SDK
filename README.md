---

# LOOM-Unity SDK

The **AO-Unity SDK** bridges Unity and the AO ecosystem on Arweave, enabling Web3 games, metaverse apps, and decentralized experiences. 

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Arweave Wallet Integration**: Connect, retrieve wallet addresses, and sign transactions in Unity.
- **AO Messaging System**: Transmit data and metadata tags to AO for real-time decentralized communication.
- **Dry-Run AO Support**: Test message processing using dry-run for leaderboard and score updates.
- **WebGL Compatibility**: Works with Unity’s WebGL export for web applications.
- **Intuitive API**: Simple functions like `ConnectWallet`, `AlertParam`, and `SendMessageToAO`.
- **Error Handling**: Built-in error handling for smooth operation.

---

## Requirements

- **Unity** 2021.3 or higher
- **WebGL Build Support**
- **Arweave Wallet** extension

---

## Installation

1. **Download the AO-Unity SDK package** from the [latest release](link-to-release).
2. **Import** into Unity by going to `Assets > Import Package > Custom Package`.
3. **Configure WebGL build settings** and ensure Arweave Wallet permissions are accessible.

---

## Getting Started

### Step 1: Add the `GameManager` Script

- Attach `GameManager` to any GameObject in the Unity scene.
- Link buttons to `ConnectWallet()` and `SendAOMessage()` functions in the Inspector.

### Step 2: Set Up WebGL Integration

Add the provided JavaScript functions to your Unity project’s `index.html` or WebGLTemplates folder.

### Step 3: Configure Arweave Wallet Access

Ensure Arweave Wallet permissions are set up to allow `SIGN_TRANSACTION` and `ACCESS_ADDRESS`.

---

## Usage Examples

### Example: Connecting to Arweave Wallet
In Unity:
```csharp
void Start() {
    ConnectWallet(); // Initiates wallet connection
}
```

In JavaScript (`mergeInto(LibraryManager.library, {...})`):
```javascript
ConnectWallet: async function () {
    await window.arweaveWallet.connect(["SIGN_TRANSACTION", "ACCESS_ADDRESS"]);
    window.alert("Wallet connected successfully!");
}
```

### Example: Sending a Message to AO with Tags
In Unity:
```csharp
public void SendAOMessage() {
    string data = "Data from Unity";
    string tagsJson = ConvertTagsToJson(messageTags);
    SendMessageToAO(data, tagsJson);
}
```

In JavaScript:
```javascript
SendMessageToAO: async function (dataPtr, tagsPtr, pidPtr = null) {
    const data = UTF8ToString(dataPtr);
    const tags = JSON.parse(UTF8ToString(tagsPtr));
    const pid = pidPtr ? UTF8ToString(pidPtr) : "default_pid";

    try {
        await AOConnectLibrary.sendMessage(pid, data, tags);
        console.log("Message sent successfully from Unity!");
    } catch (err) {
        console.error("Error sending message from Unity:", err);
    }
}
```

### Example: Dry-Run for AO Score Updates

This example demonstrates using the SDK to send periodic score updates in a `dry-run` mode.
```csharp
using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class ScoresPostRequest : MonoBehaviour
{
    public Leaderboard leaderboard;

    private void Start()
    {
        StartCoroutine(SendPostRequest());
        StartCoroutine(UpdateScoresEverySecond());
    }

    private IEnumerator SendPostRequest()
    {
        string url = "https://cu.ao-testnet.xyz/dry-run?process-id=IUBEYyFA3sQ_yalnQdrXumEVqyoJbJtl7EHgI5TCBDM";
        string jsonData = JsonUtility.ToJson(new PostData
        {
            Target = "IUBEYyFA3sQ_yalnQdrXumEVqyoJbJtl7EHgI5TCBDM",
            Id = "1234",
            Owner = "1234",
            Anchor = "0",
            Data = "1234",
            Tags = new Tag[]
            {
                new() { name = "Action", value = "GetScore" },
                new() { name = "Data-Protocol", value = "ao" },
                new() { name = "Type", value = "Message" },
                new() { name = "Variant", value = "ao.TN.1" }
            }
        });

        using UnityWebRequest www = new(url, "POST");
        www.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(jsonData));
        www.downloadHandler = new DownloadHandlerBuffer();
        www.SetRequestHeader("Content-Type", "application/json");

        yield return www.SendWebRequest();

        if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
        {
            Debug.LogError("Error: " + www.error);
            Debug.LogError("Response Code: " + www.responseCode);
            Debug.LogError("Response Body: " + www.downloadHandler.text);
        }
        else
        {
            leaderboard.UpdateLeaderboard(www.downloadHandler.text);
        }
    }

    private IEnumerator UpdateScoresEverySecond()
    {
        while (true)
        {
            yield return new WaitForSeconds(1);
            yield return SendPostRequest();
        }
    }
}

[System.Serializable]
public class PostData
{
    public string Id;
    public string Target;
    public string Owner;
    public string Anchor;
    public string Data;
    public Tag[] Tags;
}

[System.Serializable]
public class Tag
{
    public string name;
    public string value;
}
```

This script continuously sends updated scores to the AO dry-run endpoint, simulating score updates in real-time.

---

## API Reference

### `ConnectWallet()`
- Connects to the Arweave Wallet, prompting for `SIGN_TRANSACTION` and `ACCESS_ADDRESS`.

### `AlertParam(string message)`
- Shows an alert with a custom message and fetches the wallet’s active address.

### `SendMessageToAO(string data, string tags)`
- Sends data and tags to AOConnect.
- **Parameters**:
  - `data`: The message content.
  - `tags`: JSON-encoded tags for metadata.

### `ConvertTagsToJson(List<Tag> tagList)`
- Converts Unity `Tag` objects into JSON format for AOConnect.

---

## Contributing

We welcome contributions! Fork the repository, make changes, and submit a pull request.

---

## License

Licensed under the MIT License. See [LICENSE](link-to-license).

For further details, please check the [Wiki](link-to-wiki) or [Issues](link-to-issues). Happy coding with AO-Unity SDK!
